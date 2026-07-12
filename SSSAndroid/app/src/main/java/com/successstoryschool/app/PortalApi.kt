package com.successstoryschool.app

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.CookieHandler
import java.net.CookieManager
import java.net.CookiePolicy
import java.net.HttpURLConnection
import java.net.SocketTimeoutException
import java.net.URL

object PortalApi {
    private const val BASE_URL = "https://successsstoryschool.mooo.com"

    init {
        if (CookieHandler.getDefault() == null) {
            CookieHandler.setDefault(CookieManager(null, CookiePolicy.ACCEPT_ALL))
        }
    }

    suspend fun get(path: String): JSONObject = request("GET", path, null)

    suspend fun post(path: String, body: JSONObject = JSONObject()): JSONObject = request("POST", path, body)

    private suspend fun request(method: String, path: String, body: JSONObject?): JSONObject = withContext(Dispatchers.IO) {
        val connection = (URL(BASE_URL + path).openConnection() as HttpURLConnection).apply {
            requestMethod = method
            connectTimeout = 30_000
            readTimeout = 75_000
            setRequestProperty("Accept", "application/json")
            if (body != null) {
                doOutput = true
                setRequestProperty("Content-Type", "application/json")
            }
        }

        if (body != null) {
            OutputStreamWriter(connection.outputStream, Charsets.UTF_8).use { it.write(body.toString()) }
        }

        val responseText: String
        val status: Int
        try {
            status = connection.responseCode
            val stream = if (status in 200..299) connection.inputStream else connection.errorStream
            responseText = stream?.let {
                BufferedReader(InputStreamReader(it, Charsets.UTF_8)).use { reader -> reader.readText() }
            }.orEmpty()
        } catch (_: SocketTimeoutException) {
            throw PortalException("The school server took too long to respond. Wait a moment and try again.")
        }

        val json = if (responseText.isBlank()) JSONObject() else JSONObject(responseText)
        if (status !in 200..299) {
            val message = json.optString("error", "Request failed.")
            throw PortalException("Server $status: $message")
        }
        json
    }
}

class PortalException(message: String) : Exception(message)

fun jsonOf(vararg pairs: Pair<String, Any?>): JSONObject {
    val objectJson = JSONObject()
    pairs.forEach { (key, value) ->
        if (value == null) objectJson.put(key, JSONObject.NULL) else objectJson.put(key, value)
    }
    return objectJson
}

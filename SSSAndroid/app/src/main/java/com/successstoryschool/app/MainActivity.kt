@file:OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)

package com.successstoryschool.app

import android.os.Build
import android.os.Bundle
import android.content.Context
import android.net.Uri
import android.provider.OpenableColumns
import android.util.Base64
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.compose.setContent
import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.Image
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Announcement
import androidx.compose.material.icons.outlined.Assignment
import androidx.compose.material.icons.outlined.AttachFile
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material.icons.outlined.CreditCard
import androidx.compose.material.icons.outlined.DirectionsBus
import androidx.compose.material.icons.outlined.FamilyRestroom
import androidx.compose.material.icons.outlined.GridView
import androidx.compose.material.icons.outlined.Groups
import androidx.compose.material.icons.outlined.HomeWork
import androidx.compose.material.icons.outlined.Logout
import androidx.compose.material.icons.outlined.School
import androidx.compose.material.icons.outlined.TrendingUp
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.successstoryschool.app.ui.theme.SSSColors
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import java.time.LocalDate
import kotlin.math.roundToInt

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { SSSAndroidApp() }
    }
}

@Composable
private fun SSSAndroidApp() {
    MaterialTheme(
        colorScheme = lightColorScheme(
            primary = SSSColors.Navy,
            secondary = SSSColors.Amber,
            background = SSSColors.Paper,
            surface = Color.White
        )
    ) {
        var screen by remember { mutableStateOf<ScreenState>(ScreenState.Login) }
        AnimatedContent(screen, label = "screen") { state ->
            when (state) {
                ScreenState.Login -> LoginScreen(onSignedIn = { screen = ScreenState.Dashboard(it) })
                is ScreenState.Dashboard -> DashboardScreen(state.session, onLogout = { screen = ScreenState.Login })
            }
        }
    }
}

@Composable
private fun LoginScreen(onSignedIn: (Session) -> Unit) {
    val scope = rememberCoroutineScope()
    var authMode by remember { mutableStateOf(AuthMode.SignIn) }
    var role by remember { mutableStateOf(PortalRole.Student) }
    var accountId by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var signupName by remember { mutableStateOf("") }
    var signupEmail by remember { mutableStateOf("") }
    var signupPassword by remember { mutableStateOf("") }
    var signupConfirm by remember { mutableStateOf("") }
    var signupClass by remember { mutableStateOf(StudentClassChoice.all.first()) }
    var childId by remember { mutableStateOf("") }
    var username by remember { mutableStateOf("") }
    var relationship by remember { mutableStateOf("Parent") }
    var challengeId by remember { mutableStateOf<String?>(null) }
    var mfaCode by remember { mutableStateOf("") }
    var error by remember { mutableStateOf("") }
    var success by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }

    Box(Modifier.fillMaxSize()) {
        Image(
            painter = painterResource(R.drawable.school_background),
            contentDescription = null,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Box(
            Modifier
                .fillMaxSize()
                .background(Brush.verticalGradient(listOf(Color(0xAA052A4A), Color(0x22052A4A), Color(0x66000000))))
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 18.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.padding(top = 42.dp)
            ) {
                Image(
                    painter = painterResource(R.drawable.school_logo),
                    contentDescription = "Success Story School logo",
                    modifier = Modifier
                        .size(66.dp)
                        .clip(RoundedCornerShape(18.dp))
                        .background(Color.White)
                        .padding(6.dp)
                )
                Text("Success Story School", color = Color.White, fontSize = 27.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
                Text("Student, Teacher, and Parent Portal", color = Color.White.copy(alpha = 0.88f), fontSize = 14.sp, fontWeight = FontWeight.SemiBold)
            }

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 24.dp),
                shape = RoundedCornerShape(28.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.90f)),
                elevation = CardDefaults.cardElevation(12.dp)
            ) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Segmented(AuthMode.entries.map { it.title }, authMode.ordinal) { authMode = AuthMode.entries[it] }
                        if (challengeId != null) {
                            Text("Email verification", fontSize = 24.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif, color = SSSColors.Navy)
                            Text("Enter the 6-digit code sent to the student email.", color = SSSColors.Muted)
                            PortalField("Verification code", mfaCode, { mfaCode = it.filter(Char::isDigit).take(6) }, KeyboardType.Number)
                            PrimaryButton("Verify code", loading) {
                                scope.launch {
                                    loading = true
                                    error = ""
                                    runCatching {
                                        PortalApi.post("/api/auth/mfa", jsonOf("challengeId" to challengeId, "code" to mfaCode))
                                    }.onSuccess {
                                        val user = it.optJSONObject("user") ?: JSONObject()
                                        onSignedIn(Session(PortalRole.Student, user.optString("studentId"), user.optString("name", "Student")))
                                    }.onFailure { error = it.message ?: "Verification failed." }
                                    loading = false
                                }
                            }
                            TextButton(onClick = { challengeId = null }) { Text("Back to sign in") }
                        } else if (authMode == AuthMode.SignIn) {
                            Text("Welcome back", fontSize = 25.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif, color = SSSColors.Navy)
                            Text("Sign in with the account issued by the school.", color = SSSColors.Muted)
                            Segmented(PortalRole.entries.map { it.title }, role.ordinal) { role = PortalRole.entries[it] }
                            PortalField(role.idLabel, accountId, { accountId = it }, placeholder = role.placeholder)
                            PortalField("Password", password, { password = it }, password = true)
                            PrimaryButton("Sign in", loading) {
                                scope.launch {
                                    loading = true
                                    error = ""
                                    success = ""
                                    runCatching {
                                        val body = when (role) {
                                            PortalRole.Student -> jsonOf("studentId" to accountId.trim(), "password" to password)
                                            PortalRole.Teacher -> jsonOf("teacherId" to accountId.trim(), "password" to password)
                                            PortalRole.Parent -> jsonOf("identity" to accountId.trim(), "password" to password)
                                        }
                                        PortalApi.post(role.loginPath, body)
                                    }.onSuccess {
                                        if (role == PortalRole.Student && it.optBoolean("mfaRequired")) {
                                            challengeId = it.optString("challengeId")
                                        } else {
                                            val envelope = when (role) {
                                                PortalRole.Student -> it.optJSONObject("user")
                                                PortalRole.Teacher -> it.optJSONObject("teacher")
                                                PortalRole.Parent -> it.optJSONObject("parent")
                                            } ?: JSONObject()
                                            val id = envelope.optString("studentId", envelope.optString("teacherId", envelope.optString("parentId")))
                                            val name = envelope.optString("name", envelope.optString("fullName", envelope.optString("full_name", role.title)))
                                            onSignedIn(Session(role, id, name))
                                        }
                                    }.onFailure { error = it.message ?: "Sign in failed." }
                                    loading = false
                                }
                            }
                        } else {
                            Segmented(listOf("Student", "Parent"), if (role == PortalRole.Parent) 1 else 0) {
                                role = if (it == 1) PortalRole.Parent else PortalRole.Student
                            }
                            Text("Create ${role.title.lowercase()} account", fontSize = 22.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif, color = SSSColors.Navy)
                            Text("An admin must verify the account before it can sign in.", color = SSSColors.Muted)
                            PortalField("Full name", signupName, { signupName = it })
                            PortalField("Email", signupEmail, { signupEmail = it }, KeyboardType.Email)
                            if (role == PortalRole.Student) {
                                ClassPicker(signupClass) { signupClass = it }
                            } else {
                                PortalField("Username (optional)", username, { username = it })
                                PortalField("Child student ID (optional)", childId, { childId = it.uppercase() }, placeholder = "SSS-001")
                                PortalField("Relationship", relationship, { relationship = it })
                            }
                            PortalField("Password", signupPassword, { signupPassword = it }, password = true)
                            PortalField("Confirm password", signupConfirm, { signupConfirm = it }, password = true)
                            PrimaryButton("Request account", loading) {
                                scope.launch {
                                    loading = true
                                    error = ""
                                    success = ""
                                    if (signupPassword != signupConfirm) {
                                        error = "Passwords do not match."
                                        loading = false
                                        return@launch
                                    }
                                    val device = "Android ${Build.VERSION.RELEASE} (${Build.MODEL})"
                                    val path = if (role == PortalRole.Parent) "/api/parent/register" else "/api/auth/register"
                                    val body = if (role == PortalRole.Parent) {
                                        jsonOf(
                                            "name" to signupName.trim(), "email" to signupEmail.trim(), "username" to username.trim(),
                                            "studentId" to childId.trim(), "relationship" to relationship.trim(), "password" to signupPassword,
                                            "registrationSource" to "web_portal", "registrationDevice" to device
                                        )
                                    } else {
                                        jsonOf(
                                            "name" to signupName.trim(), "email" to signupEmail.trim(), "classCode" to signupClass.code,
                                            "password" to signupPassword, "registrationSource" to "web_portal", "registrationDevice" to device
                                        )
                                    }
                                    runCatching { PortalApi.post(path, body) }
                                        .onSuccess {
                                            success = if (role == PortalRole.Parent) {
                                                "Parent account requested. Admin approval is required."
                                            } else {
                                                "Student account requested. Your ID is ${it.optString("studentId")}."
                                            }
                                            authMode = AuthMode.SignIn
                                        }
                                        .onFailure { error = it.message ?: "Request failed." }
                                    loading = false
                                }
                            }
                        }
                        if (error.isNotBlank()) Text(error, color = Color(0xFF9B1C1C), fontWeight = FontWeight.SemiBold)
                        if (success.isNotBlank()) Text(success, color = SSSColors.Teal, fontWeight = FontWeight.SemiBold)
                }
            }
        }
    }
}

@Composable
private fun DashboardScreen(session: Session, onLogout: () -> Unit) {
    var payload by remember { mutableStateOf<DashboardPayload>(DashboardPayload.Loading) }
    val scope = rememberCoroutineScope()

    fun load() {
        scope.launch {
            payload = DashboardPayload.Loading
            payload = runCatching {
                when (session.role) {
                    PortalRole.Student -> DashboardPayload.Student(PortalApi.get("/api/portal"))
                    PortalRole.Parent -> DashboardPayload.Parent(PortalApi.get("/api/parent/dashboard"))
                    PortalRole.Teacher -> {
                        val assignments = PortalApi.get("/api/teacher/assignments").optJSONArray("assignments") ?: JSONArray()
                        val firstId = assignments.optJSONObject(0)?.optInt("id") ?: 0
                        val today = LocalDate.now().toString()
                        val classroom = if (firstId > 0) PortalApi.get("/api/teacher/class?assignmentId=$firstId&schoolDate=$today") else null
                        DashboardPayload.Teacher(assignments, classroom)
                    }
                }
            }.getOrElse { DashboardPayload.Error(it.message ?: "Could not load dashboard.") }
        }
    }

    LaunchedEffect(session) { load() }
    LaunchedEffect(session) {
        if (session.role == PortalRole.Student || session.role == PortalRole.Parent) {
            while (true) {
                delay(5_000)
                load()
            }
        }
    }

    val logoutAction = {
        scope.launch {
            PortalApi.post(session.role.logoutPath)
            onLogout()
        }
        Unit
    }

    BoxWithConstraints(Modifier.fillMaxSize().background(SSSColors.Paper)) {
        if (maxWidth < 700.dp) {
            MobileDashboard(session, payload, onLogout = logoutAction)
        } else {
            Row(Modifier.fillMaxSize()) {
                Sidebar(session, onLogout = logoutAction)
                LazyColumn(
                    Modifier
                        .fillMaxSize()
                        .padding(18.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    item { TopHero(session) }
                    when (val data = payload) {
                        DashboardPayload.Loading -> item { LoadingPanel() }
                        is DashboardPayload.Error -> item { Text(data.message, color = Color(0xFF9B1C1C), fontWeight = FontWeight.Bold) }
                        is DashboardPayload.Student -> studentDashboardItems(data.data)
                        is DashboardPayload.Teacher -> teacherDashboardItems(data.assignments, data.classroom)
                        is DashboardPayload.Parent -> parentDashboardItems(data.data)
                    }
                }
            }
        }
    }
}

@Composable
private fun MobileDashboard(session: Session, payload: DashboardPayload, onLogout: () -> Unit) {
    LazyColumn(
        Modifier
            .fillMaxSize()
            .background(SSSColors.Paper)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item { MobileDashboardHeader(session, onLogout) }
        when (payload) {
            DashboardPayload.Loading -> item { LoadingPanel() }
            is DashboardPayload.Error -> item { Text(payload.message, color = Color(0xFF9B1C1C), fontWeight = FontWeight.Bold) }
            is DashboardPayload.Student -> mobileStudentItems(payload.data)
            is DashboardPayload.Teacher -> mobileTeacherItems(payload.assignments, payload.classroom)
            is DashboardPayload.Parent -> mobileParentItems(payload.data)
        }
    }
}

@Composable
private fun MobileDashboardHeader(session: Session, onLogout: () -> Unit) {
    Card(
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(SSSColors.Navy),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            Modifier
                .fillMaxWidth()
                .background(SSSColors.Navy)
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Image(
                painter = painterResource(R.drawable.school_logo),
                contentDescription = "Success Story School logo",
                modifier = Modifier
                    .size(48.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(Color.White)
                    .padding(5.dp)
            )
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(session.name, color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                Text("${session.id} - ${session.role.title}", color = Color.White.copy(alpha = 0.72f), fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
            }
            TextButton(
                onClick = onLogout,
                modifier = Modifier
                    .clip(CircleShape)
                    .background(Color.White)
                    .padding(horizontal = 4.dp)
            ) {
                Text("Sign out", color = SSSColors.Navy, fontWeight = FontWeight.Bold, fontSize = 12.sp)
            }
        }
    }
}

@Composable
private fun IosMetricGrid(metrics: List<MobileMetric>) {
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        metrics.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                row.forEach { metric -> IosMetricCard(metric, Modifier.weight(1f)) }
                if (row.size == 1) Spacer(Modifier.weight(1f))
            }
        }
    }
}

@Composable
private fun IosMetricCard(metric: MobileMetric, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier.height(116.dp),
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(Color.White),
        elevation = CardDefaults.cardElevation(1.dp)
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(5.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(metric.icon, null, tint = SSSColors.Blue, modifier = Modifier.size(20.dp))
                Spacer(Modifier.width(8.dp))
                Text(metric.title.uppercase(), color = SSSColors.Muted, fontSize = 10.sp, letterSpacing = 3.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
            Text(metric.value.ifBlank { "--" }, color = SSSColors.Navy, fontSize = 29.sp, lineHeight = 31.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text(metric.detail, color = SSSColors.Muted, fontSize = 12.sp, lineHeight = 15.sp, fontWeight = FontWeight.SemiBold, maxLines = 2, overflow = TextOverflow.Ellipsis)
        }
    }
}

@Composable
private fun IosQuickActions(actions: List<MobileAction>) {
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        actions.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                row.forEach { action -> IosActionCard(action, Modifier.weight(1f)) }
                if (row.size == 1) Spacer(Modifier.weight(1f))
            }
        }
    }
}

@Composable
private fun IosActionCard(action: MobileAction, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier.height(134.dp),
        shape = RoundedCornerShape(19.dp),
        colors = CardDefaults.cardColors(Color.White),
        elevation = CardDefaults.cardElevation(1.dp)
    ) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    Modifier
                        .size(40.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(action.tint.copy(alpha = 0.14f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(action.icon, null, tint = action.tint, modifier = Modifier.size(22.dp))
                }
                Spacer(Modifier.weight(1f))
                if (action.badge.isNotBlank()) {
                    Text(
                        action.badge,
                        color = if (action.warm) SSSColors.Amber else SSSColors.Blue,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier
                            .clip(CircleShape)
                            .background((if (action.warm) SSSColors.Amber else SSSColors.Blue).copy(alpha = 0.12f))
                            .padding(horizontal = 9.dp, vertical = 5.dp)
                    )
                }
            }
            Text(action.title, color = SSSColors.Navy, fontSize = 18.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
            Text(action.subtitle, color = SSSColors.Muted, fontSize = 12.sp, lineHeight = 15.sp, maxLines = 2, overflow = TextOverflow.Ellipsis)
        }
    }
}

@Composable
private fun IosNativeCard(title: String, icon: ImageVector, badge: String = "", content: @Composable ColumnScope.() -> Unit) {
    Card(
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(Color.White),
        elevation = CardDefaults.cardElevation(1.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(Modifier.padding(17.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    Modifier
                        .size(36.dp)
                        .clip(RoundedCornerShape(11.dp))
                        .background(Color(0xFFE9F4FA)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, null, tint = SSSColors.Blue, modifier = Modifier.size(20.dp))
            }
            Spacer(Modifier.width(10.dp))
                Text(title, color = SSSColors.Navy, fontSize = 18.sp, fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f))
                if (badge.isNotBlank()) {
                    Text(
                        badge,
                        color = SSSColors.Navy,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.clip(CircleShape).background(SSSColors.Paper).padding(horizontal = 9.dp, vertical = 5.dp)
                    )
                }
            }
            content()
        }
    }
}

@Composable
private fun IosInfoRow(label: String, value: String) {
    Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Text(label, color = SSSColors.Muted, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
        Text(value.ifBlank { "--" }, color = SSSColors.Navy, fontSize = 14.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
    }
}

private data class MobileAction(
    val title: String,
    val subtitle: String,
    val icon: ImageVector,
    val badge: String = "",
    val tint: Color = SSSColors.Blue,
    val warm: Boolean = false
)

private data class AttachmentDraft(
    val name: String,
    val mimeType: String,
    val size: Long,
    val data: String
)

private fun List<AttachmentDraft>.toAttachmentJson(): JSONArray {
    val array = JSONArray()
    forEach { attachment ->
        array.put(
            jsonOf(
                "name" to attachment.name,
                "mimeType" to attachment.mimeType,
                "size" to attachment.size,
                "data" to attachment.data
            )
        )
    }
    return array
}

private fun JSONObject.attachmentsArray(): JSONArray {
    optJSONArray("attachments")?.let { return it }
    val raw = optString("attachments")
    return if (raw.trim().startsWith("[")) runCatching { JSONArray(raw) }.getOrDefault(JSONArray()) else JSONArray()
}

private fun readAttachment(context: Context, uri: Uri): AttachmentDraft? {
    val resolver = context.contentResolver
    var name = "attachment"
    var size = -1L
    resolver.query(uri, null, null, null, null)?.use { cursor ->
        val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
        val sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE)
        if (cursor.moveToFirst()) {
            if (nameIndex >= 0) name = cursor.getString(nameIndex) ?: name
            if (sizeIndex >= 0) size = cursor.getLong(sizeIndex)
        }
    }
    val extension = name.substringAfterLast('.', "").lowercase()
    val allowed = setOf("pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png")
    if (extension !in allowed) return null
    val bytes = resolver.openInputStream(uri)?.use { it.readBytes() } ?: return null
    if (bytes.isEmpty() || bytes.size > 5 * 1024 * 1024) return null
    return AttachmentDraft(
        name = name.take(120),
        mimeType = resolver.getType(uri).orEmpty(),
        size = if (size > 0) size else bytes.size.toLong(),
        data = Base64.encodeToString(bytes, Base64.NO_WRAP)
    )
}

private fun androidx.compose.foundation.lazy.LazyListScope.mobileStudentItems(payload: JSONObject) {
    item { StudentMobileWorkspace(payload) }
}

@Composable
private fun StudentMobileWorkspace(payload: JSONObject) {
    val user = payload.optJSONObject("user") ?: JSONObject()
    val records = payload.optJSONObject("records") ?: JSONObject()
    val grades = records.optJSONArray("grades") ?: JSONArray()
    val attendance = records.optJSONArray("attendance") ?: JSONArray()
    val homework = records.optJSONArray("homework") ?: JSONArray()
    val announcements = records.optJSONArray("announcements") ?: JSONArray()
    val fees = records.optJSONArray("fees") ?: JSONArray()
    val updateCount = homework.length() + announcements.length()

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        IosMetricGrid(
            listOf(
                MobileMetric("Status", if (user.optBoolean("approved")) "Active" else user.optString("approvalStatus", "Pending"), "Account access", Icons.Outlined.School),
                MobileMetric("Class", user.optString("className", user.optString("requestedClassName", "Pending")), "Homeroom", Icons.Outlined.Groups),
                MobileMetric("Updates", updateCount.toString(), "Latest posts", Icons.Outlined.Announcement),
                MobileMetric("Bus", cleanBusLabel(user.optString("transport")), "Transportation", Icons.Outlined.DirectionsBus)
            )
        )

        IosQuickActions(
            listOf(
                MobileAction("Grades", "${grades.length()} grades recorded", Icons.Outlined.TrendingUp, "${averageGrades(grades).roundToInt()}%"),
                MobileAction("Attendance", "${attendance.length()} records this term", Icons.Outlined.CalendarMonth, "${attendancePercent(attendance).roundToInt()}%"),
                MobileAction("Homework", if (homework.length() == 0) "No homework posted yet" else "Latest assignment ready", Icons.Outlined.Assignment, homework.length().toString()),
                MobileAction("Fees", if (fees.length() == 0) "No balance posted" else "Open billing items", Icons.Outlined.CreditCard, if (fees.length() == 0) "--" else fees.length().toString(), SSSColors.Amber, true)
            )
        )

        StudentGradesCard(grades)
        StudentAttendanceCard(attendance)
        StudentHomeworkCard(homework)
        StudentAnnouncementsCard(announcements)

        IosNativeCard("Fees", Icons.Outlined.CreditCard, if (fees.length() == 0) "--" else fees.length().toString()) {
            if (fees.length() == 0) {
                Text("No fee balance has been posted to this account.", color = SSSColors.Muted, lineHeight = 20.sp)
            } else {
                (0 until fees.length()).mapNotNull { fees.optJSONObject(it) }.forEach {
                    StudentHistoryRow(
                        title = it.optString("label", "Fee item"),
                        detail = "${it.optString("amount", "--")} - ${it.optString("status", "Open")}",
                        meta = "Billing"
                    )
                }
            }
        }
    }
}

@Composable
private fun StudentGradesCard(grades: JSONArray) {
    var expanded by remember(grades) { mutableStateOf(false) }
    IosNativeCard("Grades", Icons.Outlined.TrendingUp, grades.length().toString()) {
        val rows = grades.toJsonObjects()
        if (rows.isEmpty()) {
            Text("No grades posted yet.", color = SSSColors.Muted, lineHeight = 20.sp)
        } else {
            rows.take(if (expanded) rows.size else 3).forEach { grade ->
                val one = grade.scoreText("termOne", "term_one")
                val two = grade.scoreText("termTwo", "term_two")
                val detail = listOfNotNull(
                    one.takeIf { it.isNotBlank() }?.let { "Term 1: $it" },
                    two.takeIf { it.isNotBlank() }?.let { "Term 2: $it" }
                ).joinToString("  •  ").ifBlank { "Grade posted" }
                StudentHistoryRow(grade.optString("subject", "Subject"), detail, "Latest grade")
            }
            HistoryToggle(expanded, rows.size) { expanded = !expanded }
        }
    }
}

@Composable
private fun StudentAttendanceCard(attendance: JSONArray) {
    var expanded by remember(attendance) { mutableStateOf(false) }
    IosNativeCard("Attendance", Icons.Outlined.CalendarMonth, "${attendancePercent(attendance).roundToInt()}%") {
        val rows = attendance.toJsonObjects()
        if (rows.isEmpty()) {
            Text("No attendance posted yet.", color = SSSColors.Muted, lineHeight = 20.sp)
        } else {
            rows.take(if (expanded) rows.size else 3).forEach { record ->
                StudentHistoryRow(
                    title = record.optString("schoolDate", record.optString("school_date", "School day")),
                    detail = record.optString("status", "posted").replaceFirstChar { it.uppercase() },
                    meta = "Attendance"
                )
            }
            HistoryToggle(expanded, rows.size) { expanded = !expanded }
        }
    }
}

@Composable
private fun StudentHomeworkCard(homework: JSONArray) {
    var expanded by remember(homework) { mutableStateOf(false) }
    IosNativeCard("Homework", Icons.Outlined.Assignment, homework.length().toString()) {
        val rows = homework.toJsonObjects()
        if (rows.isEmpty()) {
            Text("No homework posted yet.", color = SSSColors.Muted, lineHeight = 20.sp)
        } else {
            rows.take(if (expanded) rows.size else 3).forEach { item ->
                val dueDate = item.optString("dueDate", item.optString("due_date", "")).ifBlank { "Class post" }
                StudentHistoryRow(item.optString("subject", "Homework"), item.optString("details", "Assignment posted"), dueDate)
            }
            HistoryToggle(expanded, rows.size) { expanded = !expanded }
        }
    }
}

@Composable
private fun StudentAnnouncementsCard(announcements: JSONArray) {
    var expanded by remember(announcements) { mutableStateOf(false) }
    IosNativeCard("Announcements", Icons.Outlined.Announcement, announcements.length().toString()) {
        val rows = announcements.toJsonObjects()
        if (rows.isEmpty()) {
            Text("No announcements posted yet.", color = SSSColors.Muted, lineHeight = 20.sp)
        } else {
            rows.take(if (expanded) rows.size else 3).forEach { item ->
                StudentHistoryRow(item.optString("title", "Announcement"), item.optString("details", "Posted"), item.optString("postedAt", item.optString("posted_at", "School post")))
            }
            HistoryToggle(expanded, rows.size) { expanded = !expanded }
        }
    }
}

@Composable
private fun StudentHistoryRow(title: String, detail: String, meta: String) {
    Column(Modifier.fillMaxWidth().padding(vertical = 7.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Text(title.ifBlank { "Posted" }, color = SSSColors.Navy, fontSize = 20.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
        Text(detail.ifBlank { "Details posted" }, color = SSSColors.Muted, fontSize = 15.sp, lineHeight = 20.sp, maxLines = 3, overflow = TextOverflow.Ellipsis)
        Text(meta.ifBlank { "Latest" }, color = SSSColors.Amber, fontSize = 12.sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun HistoryToggle(expanded: Boolean, count: Int, onClick: () -> Unit) {
    if (count > 3) {
        Text(
            if (expanded) "Show latest" else "View full history",
            color = SSSColors.Blue,
            fontWeight = FontWeight.Bold,
            modifier = Modifier
                .clip(CircleShape)
                .background(Color(0xFFE9F4FA))
                .clickable(onClick = onClick)
                .padding(horizontal = 13.dp, vertical = 8.dp)
        )
    }
}

private fun androidx.compose.foundation.lazy.LazyListScope.mobileTeacherItems(assignments: JSONArray, classroom: JSONObject?) {
    item { TeacherMobileWorkspace(assignments, classroom) }
}

@Composable
private fun TeacherMobileWorkspace(assignments: JSONArray, initialClassroom: JSONObject?) {
    val scope = rememberCoroutineScope()
    var selectedAssignmentId by remember(assignments) { mutableStateOf(assignments.optJSONObject(0)?.optInt("id") ?: 0) }
    var schoolDate by remember { mutableStateOf(initialClassroom?.optString("schoolDate").orEmpty().ifBlank { LocalDate.now().toString() }) }
    var classroom by remember { mutableStateOf(initialClassroom) }
    var tab by remember { mutableStateOf("Overview") }
    var loading by remember { mutableStateOf(false) }
    var status by remember { mutableStateOf("") }
    var error by remember { mutableStateOf("") }

    fun reload() {
        if (selectedAssignmentId <= 0) return
        scope.launch {
            loading = true
            error = ""
            runCatching {
                PortalApi.get("/api/teacher/class?assignmentId=$selectedAssignmentId&schoolDate=$schoolDate")
            }.onSuccess {
                classroom = it
            }.onFailure {
                error = it.message ?: "Could not load class."
            }
            loading = false
        }
    }

    LaunchedEffect(selectedAssignmentId) {
        if (selectedAssignmentId > 0 && (classroom == null || classroom?.optJSONObject("assignment")?.optInt("id") != selectedAssignmentId)) {
            reload()
        }
    }

    val students = classroom?.optJSONArray("students") ?: JSONArray()
    val homework = classroom?.optJSONArray("homework") ?: JSONArray()
    val announcements = classroom?.optJSONArray("announcements") ?: JSONArray()
    val assignment = classroom?.optJSONObject("assignment")
    val selectedSubject = assignment?.optString("subject").orEmpty().ifBlank { assignments.optJSONObject(0)?.optString("subject", "--") ?: "--" }
    val selectedClass = assignment?.optJSONObject("class")?.optString("name").orEmpty().ifBlank {
        assignments.optJSONObject(0)?.optJSONObject("class")?.optString("name", "--") ?: "--"
    }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        IosMetricGrid(
            listOf(
                MobileMetric("Assignments", assignments.length().toString(), "Assignments", Icons.Outlined.School),
                MobileMetric("Students", students.length().toString(), "Students", Icons.Outlined.Groups),
                MobileMetric("Subject", selectedSubject, "Subject", Icons.Outlined.Assignment),
                MobileMetric("Class", selectedClass, "Class", Icons.Outlined.GridView)
            )
        )

        TeacherAssignmentsCard(assignments, selectedAssignmentId) { nextId ->
            selectedAssignmentId = nextId
            status = ""
            error = ""
        }

        IosNativeCard("School date", Icons.Outlined.CalendarMonth) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                OutlinedTextField(
                    value = schoolDate,
                    onValueChange = { schoolDate = it },
                    modifier = Modifier.weight(1f),
                    singleLine = true,
                    shape = RoundedCornerShape(16.dp),
                    placeholder = { Text("YYYY-MM-DD") }
                )
                Spacer(Modifier.width(10.dp))
                Button(
                    onClick = { reload() },
                    enabled = !loading,
                    shape = CircleShape,
                    colors = ButtonDefaults.buttonColors(containerColor = SSSColors.Navy),
                    modifier = Modifier.size(54.dp)
                ) {
                    Text("↻", color = Color.White, fontSize = 22.sp, fontWeight = FontWeight.Bold)
                }
            }
        }

        val tabs = listOf("Overview", "Grade Book", "Homework", "Announcements")
        Segmented(tabs, tabs.indexOf(tab).coerceAtLeast(0)) {
            tab = tabs[it]
        }

        when (tab) {
            "Overview" -> TeacherAttendancePanel(classroom, selectedAssignmentId, schoolDate) { message, isError ->
                status = if (isError) "" else message
                error = if (isError) message else ""
                if (!isError) reload()
            }
            "Grade Book" -> TeacherGradesPanel(classroom, selectedAssignmentId) { message, isError ->
                status = if (isError) "" else message
                error = if (isError) message else ""
                if (!isError) reload()
            }
            "Homework" -> TeacherHomeworkPanel(classroom, selectedAssignmentId) { message, isError ->
                status = if (isError) "" else message
                error = if (isError) message else ""
                if (!isError) reload()
            }
            "Announcements" -> TeacherAnnouncementPanel(classroom, selectedAssignmentId) { message, isError ->
                status = if (isError) "" else message
                error = if (isError) message else ""
                if (!isError) reload()
            }
        }

        if (error.isNotBlank()) Text(error, color = Color(0xFF9B1C1C), fontWeight = FontWeight.Bold)
        if (status.isNotBlank()) {
            Text(
                status,
                color = SSSColors.Teal,
                fontWeight = FontWeight.Bold,
                modifier = Modifier
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color(0xFFE0F3E9))
                    .padding(horizontal = 14.dp, vertical = 10.dp)
            )
        }
    }
}

@Composable
private fun TeacherAssignmentsCard(assignments: JSONArray, selectedAssignmentId: Int, onSelected: (Int) -> Unit) {
    IosNativeCard("Assignments", Icons.Outlined.School) {
        if (assignments.length() == 0) {
            Text("No teaching assignments yet.", color = SSSColors.Muted)
        } else {
            Row(
                Modifier
                    .horizontalScroll(rememberScrollState())
                    .padding(bottom = 2.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                (0 until assignments.length()).mapNotNull { assignments.optJSONObject(it) }.forEach { assignment ->
                    val id = assignment.optInt("id")
                    val selected = id == selectedAssignmentId
                    Column(
                        Modifier
                            .width(150.dp)
                            .clip(RoundedCornerShape(16.dp))
                            .background(if (selected) SSSColors.Navy else Color.White)
                            .clickable { onSelected(id) }
                            .padding(13.dp)
                    ) {
                        Text(
                            assignment.optJSONObject("class")?.optString("name", "Class") ?: "Class",
                            color = if (selected) Color.White else SSSColors.Navy,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp
                        )
                        Text(
                            assignment.optString("subject", "Subject"),
                            color = if (selected) Color.White.copy(alpha = 0.8f) else SSSColors.Muted,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun TeacherRosterPanel(classroom: JSONObject?) {
    val students = classroom?.optJSONArray("students") ?: JSONArray()
    IosNativeCard("Class roster", Icons.Outlined.Groups) {
        if (classroom == null) {
            Text("Choose an assignment.", color = SSSColors.Muted)
        } else if (students.length() == 0) {
            Text("No students in this class yet.", color = SSSColors.Muted)
        } else {
            (0 until students.length()).mapNotNull { students.optJSONObject(it) }.forEach { student ->
                Row(Modifier.fillMaxWidth().padding(vertical = 5.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text(student.optString("name"), color = SSSColors.Navy, fontWeight = FontWeight.Bold)
                        Text(student.optString("studentId"), color = SSSColors.Muted, fontSize = 12.sp)
                    }
                    Text(
                        student.optString("attendanceStatus", "present").replaceFirstChar { it.uppercase() },
                        color = SSSColors.Navy,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.clip(CircleShape).background(SSSColors.Paper).padding(horizontal = 12.dp, vertical = 7.dp)
                    )
                }
            }
        }
    }
}

@Composable
private fun TeacherAttendancePanel(classroom: JSONObject?, assignmentId: Int, schoolDate: String, onDone: (String, Boolean) -> Unit) {
    val scope = rememberCoroutineScope()
    val students = classroom?.optJSONArray("students") ?: JSONArray()
    var saving by remember { mutableStateOf(false) }
    var statuses by remember(classroom) {
        mutableStateOf(
            (0 until students.length()).mapNotNull { students.optJSONObject(it) }.associate {
                it.optString("studentId") to it.optString("attendanceStatus", "present")
            }
        )
    }
    IosNativeCard("Attendance", Icons.Outlined.CalendarMonth) {
        if (classroom == null) {
            Text("Choose an assignment.", color = SSSColors.Muted)
        } else if (students.length() == 0) {
            Text("No students to mark.", color = SSSColors.Muted)
        } else {
            (0 until students.length()).mapNotNull { students.optJSONObject(it) }.forEach { student ->
                val studentId = student.optString("studentId")
                Row(Modifier.fillMaxWidth().padding(vertical = 5.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text(student.optString("name"), color = SSSColors.Navy, fontWeight = FontWeight.SemiBold)
                        Text(studentId, color = SSSColors.Muted, fontSize = 12.sp)
                    }
                    Segmented(listOf("Present", "Absent", "Late"), listOf("present", "absent", "late").indexOf(statuses[studentId]).coerceAtLeast(0)) { index ->
                        statuses = statuses + (studentId to listOf("present", "absent", "late")[index])
                    }
                }
            }
            PrimaryButton("Save attendance", saving) {
                scope.launch {
                    saving = true
                    val records = JSONArray()
                    statuses.forEach { (studentId, status) ->
                        records.put(jsonOf("studentId" to studentId, "status" to status))
                    }
                    runCatching {
                        PortalApi.post("/api/teacher/attendance", jsonOf("assignmentId" to assignmentId, "schoolDate" to schoolDate, "records" to records))
                    }.onSuccess {
                        onDone("Attendance saved.", false)
                    }.onFailure {
                        onDone(it.message ?: "Could not save attendance.", true)
                    }
                    saving = false
                }
            }
        }
    }
}

@Composable
private fun TeacherGradesPanel(classroom: JSONObject?, assignmentId: Int, onDone: (String, Boolean) -> Unit) {
    val scope = rememberCoroutineScope()
    val students = classroom?.optJSONArray("students") ?: JSONArray()
    val subject = classroom?.optJSONObject("assignment")?.optString("subject", "Subject") ?: "Subject"
    var saving by remember { mutableStateOf(false) }
    var termOne by remember(classroom) {
        mutableStateOf((0 until students.length()).mapNotNull { students.optJSONObject(it) }.associate {
            it.optString("studentId") to it.optJSONObject("subjectGrade")?.optString("termOne").orEmpty().replace("null", "")
        })
    }
    var termTwo by remember(classroom) {
        mutableStateOf((0 until students.length()).mapNotNull { students.optJSONObject(it) }.associate {
            it.optString("studentId") to it.optJSONObject("subjectGrade")?.optString("termTwo").orEmpty().replace("null", "")
        })
    }
    IosNativeCard("Gradebook", Icons.Outlined.TrendingUp) {
        if (classroom == null) {
            Text("Choose an assignment.", color = SSSColors.Muted)
        } else if (students.length() == 0) {
            Text("No students to grade.", color = SSSColors.Muted)
        } else {
            (0 until students.length()).mapNotNull { students.optJSONObject(it) }.forEach { student ->
                val studentId = student.optString("studentId")
                Column(Modifier.padding(vertical = 8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            Text(student.optString("name"), color = SSSColors.Navy, fontWeight = FontWeight.Bold)
                            Text(studentId, color = SSSColors.Muted, fontSize = 12.sp)
                        }
                        Text(subject, color = SSSColors.Amber, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedTextField(
                            value = termOne[studentId].orEmpty(),
                            onValueChange = { termOne = termOne + (studentId to it) },
                            placeholder = { Text("Term 1") },
                            singleLine = true,
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(14.dp),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                        )
                        OutlinedTextField(
                            value = termTwo[studentId].orEmpty(),
                            onValueChange = { termTwo = termTwo + (studentId to it) },
                            placeholder = { Text("Term 2") },
                            singleLine = true,
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(14.dp),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                        )
                    }
                }
            }
            PrimaryButton("Save grade changes", saving) {
                scope.launch {
                    saving = true
                    val rows = JSONArray()
                    (termOne.keys + termTwo.keys).forEach { studentId ->
                        val one = termOne[studentId].orEmpty().trim()
                        val two = termTwo[studentId].orEmpty().trim()
                        if (one.isNotBlank() || two.isNotBlank()) {
                            rows.put(jsonOf("studentId" to studentId, "termOne" to one.ifBlank { null }, "termTwo" to two.ifBlank { null }))
                        }
                    }
                    runCatching {
                        PortalApi.post("/api/teacher/grades", jsonOf("assignmentId" to assignmentId, "grades" to rows))
                    }.onSuccess {
                        onDone("Grades saved.", false)
                    }.onFailure {
                        onDone(it.message ?: "Could not save grades.", true)
                    }
                    saving = false
                }
            }
        }
    }
}

@Composable
private fun AttachmentPicker(
    attachments: List<AttachmentDraft>,
    onAdd: (AttachmentDraft) -> Unit,
    onRemove: (Int) -> Unit,
    onError: (String) -> Unit
) {
    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(ActivityResultContracts.OpenDocument()) { uri ->
        if (uri != null) {
            val attachment = readAttachment(context, uri)
            if (attachment == null) {
                onError("Attach PDF, Word, Excel, JPG, or PNG files up to 5 MB.")
            } else {
                onAdd(attachment)
            }
        }
    }
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("ATTACHMENTS", color = SSSColors.Muted, fontSize = 12.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.4.sp)
        Row(
            Modifier
                .clip(RoundedCornerShape(13.dp))
                .border(BorderStroke(1.dp, Color(0xFFE8E1DA)), RoundedCornerShape(13.dp))
                .clickable {
                    launcher.launch(
                        arrayOf(
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "application/vnd.ms-excel",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "image/jpeg",
                            "image/png"
                        )
                    )
                }
                .padding(horizontal = 12.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(Icons.Outlined.AttachFile, null, tint = SSSColors.Muted, modifier = Modifier.size(18.dp))
            Spacer(Modifier.width(8.dp))
            Text("Attach PDF, Word, Excel, or photo", color = SSSColors.Muted, fontWeight = FontWeight.Bold)
        }
        attachments.forEachIndexed { index, attachment ->
            Row(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(14.dp))
                    .background(SSSColors.Paper)
                    .padding(10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Outlined.AttachFile, null, tint = SSSColors.Maroon, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(8.dp))
                Text(attachment.name, color = SSSColors.Navy, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f), maxLines = 1, overflow = TextOverflow.Ellipsis)
                TextButton(onClick = { onRemove(index) }) {
                    Text("Remove", color = SSSColors.Maroon, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
private fun TeacherHomeworkPanel(classroom: JSONObject?, assignmentId: Int, onDone: (String, Boolean) -> Unit) {
    val scope = rememberCoroutineScope()
    var homeworkDetails by remember { mutableStateOf("") }
    var homeworkDue by remember { mutableStateOf("") }
    var savingHomework by remember { mutableStateOf(false) }
    var attachments by remember { mutableStateOf<List<AttachmentDraft>>(emptyList()) }
    val homework = classroom?.optJSONArray("homework") ?: JSONArray()
    val subject = classroom?.optJSONObject("assignment")?.optString("subject", "Subject") ?: "Subject"

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        IosNativeCard("Post homework", Icons.Outlined.Assignment) {
            OutlinedTextField(
                value = subject,
                onValueChange = {},
                enabled = false,
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                shape = RoundedCornerShape(16.dp),
                label = { Text("SUBJECT") }
            )
            OutlinedTextField(
                value = homeworkDetails,
                onValueChange = { homeworkDetails = it },
                modifier = Modifier.fillMaxWidth().heightIn(min = 100.dp),
                shape = RoundedCornerShape(16.dp),
                placeholder = { Text("Describe the assignment...") }
            )
            OutlinedTextField(
                value = homeworkDue,
                onValueChange = { homeworkDue = it },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                shape = RoundedCornerShape(16.dp),
                placeholder = { Text("Due date, optional: YYYY-MM-DD") }
            )
            AttachmentPicker(
                attachments = attachments,
                onAdd = { if (attachments.size < 5) attachments = attachments + it else onDone("Attach up to five files.", true) },
                onRemove = { index -> attachments = attachments.filterIndexed { itemIndex, _ -> itemIndex != index } },
                onError = { onDone(it, true) }
            )
            PrimaryButton("Post homework", savingHomework) {
                scope.launch {
                    savingHomework = true
                    runCatching {
                        PortalApi.post(
                            "/api/teacher/homework",
                            jsonOf(
                                "assignmentId" to assignmentId,
                                "details" to homeworkDetails,
                                "dueDate" to homeworkDue,
                                "attachments" to attachments.toAttachmentJson()
                            )
                        )
                    }.onSuccess {
                        homeworkDetails = ""
                        homeworkDue = ""
                        attachments = emptyList()
                        onDone("Homework posted.", false)
                    }.onFailure {
                        onDone(it.message ?: "Could not post homework.", true)
                    }
                    savingHomework = false
                }
            }
        }
        IosNativeCard("Recent homework", Icons.Outlined.Assignment) {
            if (homework.length() == 0) {
                Text("No recent homework.", color = SSSColors.Muted)
            } else {
                (0 until homework.length()).mapNotNull { homework.optJSONObject(it) }.take(6).forEach {
                    TeacherPostRow(
                        "Homework",
                        it.optString("subject", "Homework"),
                        it.optString("details"),
                        it.optString("dueDate").ifBlank { "Class post" },
                        it.attachmentsArray()
                    )
                }
            }
        }
    }
}

@Composable
private fun TeacherAnnouncementPanel(classroom: JSONObject?, assignmentId: Int, onDone: (String, Boolean) -> Unit) {
    val scope = rememberCoroutineScope()
    var announcementTitle by remember { mutableStateOf("") }
    var announcementDetails by remember { mutableStateOf("") }
    var savingAnnouncement by remember { mutableStateOf(false) }
    var attachments by remember { mutableStateOf<List<AttachmentDraft>>(emptyList()) }
    val announcements = classroom?.optJSONArray("announcements") ?: JSONArray()

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        IosNativeCard("Send announcement", Icons.Outlined.Announcement) {
            OutlinedTextField(
                value = announcementTitle,
                onValueChange = { announcementTitle = it },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                shape = RoundedCornerShape(16.dp),
                placeholder = { Text("Title") }
            )
            OutlinedTextField(
                value = announcementDetails,
                onValueChange = { announcementDetails = it },
                modifier = Modifier.fillMaxWidth().heightIn(min = 100.dp),
                shape = RoundedCornerShape(16.dp),
                placeholder = { Text("Write your announcement here...") }
            )
            AttachmentPicker(
                attachments = attachments,
                onAdd = { if (attachments.size < 5) attachments = attachments + it else onDone("Attach up to five files.", true) },
                onRemove = { index -> attachments = attachments.filterIndexed { itemIndex, _ -> itemIndex != index } },
                onError = { onDone(it, true) }
            )
            PrimaryButton("Post announcement", savingAnnouncement) {
                scope.launch {
                    savingAnnouncement = true
                    runCatching {
                        PortalApi.post(
                            "/api/teacher/announcement",
                            jsonOf(
                                "assignmentId" to assignmentId,
                                "title" to announcementTitle,
                                "details" to announcementDetails,
                                "attachments" to attachments.toAttachmentJson()
                            )
                        )
                    }.onSuccess {
                        announcementTitle = ""
                        announcementDetails = ""
                        attachments = emptyList()
                        onDone("Announcement posted.", false)
                    }.onFailure {
                        onDone(it.message ?: "Could not post announcement.", true)
                    }
                    savingAnnouncement = false
                }
            }
        }
        IosNativeCard("Recent announcements", Icons.Outlined.Announcement) {
            if (announcements.length() == 0) {
                Text("No recent announcements.", color = SSSColors.Muted)
            } else {
                (0 until announcements.length()).mapNotNull { announcements.optJSONObject(it) }.take(6).forEach {
                    TeacherPostRow(
                        "Announcement",
                        it.optString("title", "Announcement"),
                        it.optString("details"),
                        it.optString("postedAt").ifBlank { "Class post" },
                        it.attachmentsArray()
                    )
                }
            }
        }
    }
}

@Composable
private fun TeacherPostRow(label: String, title: String, details: String, meta: String, attachments: JSONArray = JSONArray()) {
    Column(Modifier.fillMaxWidth().padding(vertical = 8.dp), verticalArrangement = Arrangement.spacedBy(5.dp)) {
        Text(label, color = SSSColors.Navy, fontSize = 12.sp, fontWeight = FontWeight.Bold, modifier = Modifier.clip(CircleShape).background(SSSColors.Paper).padding(horizontal = 10.dp, vertical = 6.dp))
        Text(title, color = SSSColors.Navy, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        Text(details, color = SSSColors.Muted, lineHeight = 19.sp)
        Text(meta, color = SSSColors.Amber, fontWeight = FontWeight.Bold, fontSize = 12.sp)
        if (attachments.length() > 0) {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                (0 until attachments.length()).mapNotNull { attachments.optJSONObject(it) }.forEach { attachment ->
                    Row(
                        Modifier
                            .clip(CircleShape)
                            .background(Color(0xFFF8EEF0))
                            .padding(horizontal = 10.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Outlined.AttachFile, null, tint = SSSColors.Maroon, modifier = Modifier.size(14.dp))
                        Spacer(Modifier.width(5.dp))
                        Text(attachment.optString("name"), color = SSSColors.Maroon, fontWeight = FontWeight.Bold, fontSize = 12.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    }
                }
            }
        }
    }
}

private fun androidx.compose.foundation.lazy.LazyListScope.mobileParentItems(payload: JSONObject) {
    val parent = payload.optJSONObject("parent") ?: JSONObject()
    val children = payload.optJSONArray("children") ?: JSONArray()
    item {
        IosMetricGrid(
            listOf(
                MobileMetric("Children", children.length().toString(), "Linked accounts", Icons.Outlined.FamilyRestroom),
                MobileMetric("Billing", "Open", "Expenses and payments", Icons.Outlined.CreditCard),
                MobileMetric("Updates", "Live", "School records", Icons.Outlined.Announcement),
                MobileMetric("Account", parent.optString("status", "Active"), "Parent access", Icons.Outlined.School)
            )
        )
    }
    item {
        IosNativeCard("Children", Icons.Outlined.FamilyRestroom, children.length().toString()) {
            if (children.length() == 0) {
                Text("No child accounts are linked yet.", color = SSSColors.Muted)
            } else {
                (0 until children.length()).mapNotNull { children.optJSONObject(it) }.forEach { child ->
                    val student = child.optJSONObject("student") ?: child
                    SimpleRowCard(student.optString("name", "Child account"), "${student.optString("studentId")} - ${student.optString("className", "Pending class")}", Icons.Outlined.School)
                }
            }
        }
    }
    item {
        IosNativeCard("Billing", Icons.Outlined.CreditCard, "Open") {
            Text("Expenses, balances, and payment records for linked children appear here when the school posts them.", color = SSSColors.Muted, lineHeight = 20.sp)
        }
    }
}

private data class MobileMetric(val title: String, val value: String, val detail: String, val icon: ImageVector)

@Composable
private fun IosRecordCard(title: String, records: JSONArray, titleKey: String, detailKey: String, icon: ImageVector, badge: String) {
    IosNativeCard(title, icon, badge) {
        if (records.length() == 0) {
            Text("Nothing posted yet.", color = SSSColors.Muted, lineHeight = 20.sp)
        } else {
            (0 until records.length()).mapNotNull { records.optJSONObject(it) }.take(4).forEach {
                Text(it.optString(titleKey).ifBlank { title }, color = SSSColors.Navy, fontSize = 18.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
                Text(it.optString(detailKey).ifBlank { "Posted" }, color = SSSColors.Muted, lineHeight = 19.sp)
            }
        }
    }
}

private fun androidx.compose.foundation.lazy.LazyListScope.studentDashboardItems(payload: JSONObject) {
    val user = payload.optJSONObject("user") ?: JSONObject()
    val records = payload.optJSONObject("records") ?: JSONObject()
    val grades = records.optJSONArray("grades") ?: JSONArray()
    val attendance = records.optJSONArray("attendance") ?: JSONArray()
    val homework = records.optJSONArray("homework") ?: JSONArray()
    val announcements = records.optJSONArray("announcements") ?: JSONArray()
    val fees = records.optJSONArray("fees") ?: JSONArray()
    val gradeAverage = averageGrades(grades)
    val attendancePercent = attendancePercent(attendance)
    item {
        FlowRow(horizontalArrangement = Arrangement.spacedBy(14.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            StatCard("ACCOUNT STATUS", user.optString("approvalStatus", if (user.optBoolean("approved")) "Active" else "Pending"), Icons.Outlined.School)
            StatCard("HOMEROOM", user.optString("className", user.optString("requestedClassName", "Not assigned")), Icons.Outlined.Groups)
            StatCard("SCHOOL UPDATES", "${announcements.length()} New", Icons.Outlined.Announcement)
            StatCard("TRANSPORTATION", user.optString("transport", "No bus required"), Icons.Outlined.DirectionsBus)
        }
    }
    item { SnapshotBanner("${user.optString("name", "Student")}'s Account", "Latest records are now live in this overview.", listOf("Grades" to grades.length().toString(), "Homework" to homework.length().toString(), "Announcements" to announcements.length().toString())) }
    item {
        FlowRow(horizontalArrangement = Arrangement.spacedBy(14.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            BigCard("GRADES", "${gradeAverage.roundToInt()}%", "${grades.length()} grades recorded", Icons.Outlined.TrendingUp)
            BigCard("ATTENDANCE", "${attendancePercent.roundToInt()}%", "${attendance.length()} attendance records", Icons.Outlined.CalendarMonth)
            BigCard("HOMEWORK", homework.length().toString(), if (homework.length() == 0) "No homework posted yet" else "Assignments ready", Icons.Outlined.Assignment)
            BigCard("FEE BALANCE", if (fees.length() == 0) "--" else "${fees.length()} items", if (fees.length() == 0) "Not posted" else "Open billing", Icons.Outlined.CreditCard, warm = true)
        }
    }
    item { RecordList("Announcements", announcements, "title", "details") }
    item { RecordList("Homework", homework, "subject", "details") }
}

private fun androidx.compose.foundation.lazy.LazyListScope.teacherDashboardItems(assignments: JSONArray, classroom: JSONObject?) {
    item {
        FlowRow(horizontalArrangement = Arrangement.spacedBy(14.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            StatCard("ASSIGNMENTS", assignments.length().toString(), Icons.Outlined.School)
            StatCard("CURRENT CLASS", classroom?.optJSONObject("assignment")?.optJSONObject("class")?.optString("name", "Choose a class") ?: "No class", Icons.Outlined.Groups)
            StatCard("STUDENTS", (classroom?.optJSONArray("students")?.length() ?: 0).toString(), Icons.Outlined.GridView)
            StatCard("POSTS", "${classroom?.optJSONArray("homework")?.length() ?: 0} homework", Icons.Outlined.Assignment)
        }
    }
    item { SnapshotBanner("Teacher workspace", "Manage attendance, grades, homework, and announcements from the native app.", listOf("Classes" to assignments.length().toString(), "Roster" to "${classroom?.optJSONArray("students")?.length() ?: 0}", "Updates" to "${classroom?.optJSONArray("announcements")?.length() ?: 0}")) }
    val students = classroom?.optJSONArray("students") ?: JSONArray()
    items((0 until students.length()).mapNotNull { students.optJSONObject(it) }) { student ->
        SimpleRowCard(student.optString("name"), "${student.optString("studentId")} • ${student.optString("attendanceStatus")}", Icons.Outlined.School)
    }
}

private fun androidx.compose.foundation.lazy.LazyListScope.parentDashboardItems(payload: JSONObject) {
    val parent = payload.optJSONObject("parent") ?: JSONObject()
    val children = payload.optJSONArray("children") ?: JSONArray()
    item {
        FlowRow(horizontalArrangement = Arrangement.spacedBy(14.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
            StatCard("ACCOUNT", parent.optString("status", "Active"), Icons.Outlined.FamilyRestroom)
            StatCard("CHILDREN", children.length().toString(), Icons.Outlined.Groups)
            StatCard("BILLING", "Open", Icons.Outlined.CreditCard)
            StatCard("SCHOOL UPDATES", "Live", Icons.Outlined.Announcement)
        }
    }
    items((0 until children.length()).mapNotNull { children.optJSONObject(it) }) { child ->
        val student = child.optJSONObject("student") ?: child
        SimpleRowCard(student.optString("name", "Child account"), "${student.optString("studentId")} • ${student.optString("className", "Pending class")}", Icons.Outlined.School)
    }
}

@Composable
private fun Sidebar(session: Session, onLogout: () -> Unit) {
    Column(
        Modifier
            .width(230.dp)
            .fillMaxHeight()
            .background(Brush.verticalGradient(listOf(SSSColors.NavyDeep, SSSColors.Blue)))
            .padding(18.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Text("Success Story School", color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
        Text("${session.role.title.uppercase()} PORTAL", color = SSSColors.Amber, fontSize = 12.sp, letterSpacing = 3.sp)
        Card(colors = CardDefaults.cardColors(Color.White.copy(alpha = 0.08f)), shape = RoundedCornerShape(18.dp)) {
            Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(46.dp).clip(CircleShape).background(SSSColors.Amber), contentAlignment = Alignment.Center) {
                    Text(session.name.take(1).uppercase(), color = SSSColors.Navy, fontWeight = FontWeight.Bold)
                }
                Spacer(Modifier.width(10.dp))
                Column {
                    Text(session.name, color = Color.White, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    Text(session.id, color = Color.White.copy(alpha = 0.65f), fontSize = 12.sp)
                }
            }
        }
        listOf("Overview", "Grades", "Attendance", "Homework", "Announcements", "Fees", "Bus details").forEachIndexed { index, label ->
            Row(
                Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(13.dp))
                    .background(if (index == 0) Color.White.copy(alpha = 0.92f) else Color.Transparent)
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Outlined.GridView, null, tint = if (index == 0) SSSColors.Navy else Color.White.copy(alpha = 0.78f), modifier = Modifier.size(19.dp))
                Spacer(Modifier.width(10.dp))
                Text(label, color = if (index == 0) SSSColors.Navy else Color.White.copy(alpha = 0.78f), fontWeight = FontWeight.SemiBold)
            }
        }
        Spacer(Modifier.weight(1f))
        Button(onClick = onLogout, colors = ButtonDefaults.buttonColors(containerColor = Color.White.copy(alpha = 0.08f)), modifier = Modifier.fillMaxWidth()) {
            Icon(Icons.Outlined.Logout, null, tint = Color.White)
            Spacer(Modifier.width(8.dp))
            Text("Log out", color = Color.White)
        }
    }
}

@Composable
private fun TopHero(session: Session) {
    Card(
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = SSSColors.Navy),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            Modifier
                .fillMaxWidth()
                .background(Brush.horizontalGradient(listOf(SSSColors.NavyDeep, SSSColors.Navy, SSSColors.Blue)))
                .padding(28.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(Modifier.weight(1f)) {
                Text("${session.role.title.uppercase()} DASHBOARD", color = Color.White.copy(alpha = 0.55f), fontSize = 12.sp, letterSpacing = 4.sp)
                Text("Welcome, ${session.name}", color = Color.White, fontSize = 34.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
                Text("Your latest school records, updates, and account tools are all in one place.", color = Color.White.copy(alpha = 0.72f))
            }
            Text("Academic Year 2025 / 2026", color = SSSColors.Navy, modifier = Modifier.clip(RoundedCornerShape(30.dp)).background(SSSColors.Amber).padding(horizontal = 18.dp, vertical = 10.dp))
        }
    }
}

@Composable
private fun StatCard(label: String, value: String, icon: ImageVector) {
    Card(Modifier.width(230.dp).height(112.dp), shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(Color.White), elevation = CardDefaults.cardElevation(2.dp)) {
        Row(Modifier.fillMaxSize().padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(icon, null, tint = SSSColors.Teal, modifier = Modifier.size(26.dp))
            Spacer(Modifier.width(12.dp))
            Column {
                Text(label, color = SSSColors.Muted, fontSize = 12.sp, letterSpacing = 3.sp)
                Text(value.ifBlank { "--" }, color = SSSColors.Navy, fontSize = 22.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
        }
    }
}

@Composable
private fun BigCard(label: String, value: String, detail: String, icon: ImageVector, warm: Boolean = false) {
    val alpha by animateFloatAsState(if (warm) 1f else 0.92f, label = "card-alpha")
    Card(Modifier.width(310.dp).height(150.dp).alpha(alpha), shape = RoundedCornerShape(20.dp), colors = CardDefaults.cardColors(Color.White), elevation = CardDefaults.cardElevation(1.dp)) {
        Box(Modifier.fillMaxSize().background(Brush.radialGradient(listOf(if (warm) Color(0x33FFC857) else Color(0x3329B6C9), Color.Transparent)))) {
            Column(Modifier.padding(22.dp)) {
                Icon(icon, null, tint = SSSColors.Blue)
                Spacer(Modifier.height(10.dp))
                Text(label, color = SSSColors.Muted, fontSize = 12.sp, letterSpacing = 4.sp)
                Text(value, color = SSSColors.Navy, fontSize = 34.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
                Text(detail, color = SSSColors.Muted, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

@Composable
private fun SnapshotBanner(title: String, subtitle: String, stats: List<Pair<String, String>>) {
    Card(shape = RoundedCornerShape(22.dp), colors = CardDefaults.cardColors(SSSColors.Navy), modifier = Modifier.fillMaxWidth()) {
        Row(Modifier.background(Brush.horizontalGradient(listOf(SSSColors.NavyDeep, SSSColors.Blue))).padding(24.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("SNAPSHOT", color = Color.White.copy(alpha = 0.5f), letterSpacing = 4.sp, fontSize = 12.sp)
                Text(title, color = Color.White, fontSize = 28.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
                Text(subtitle, color = Color.White.copy(alpha = 0.75f))
            }
            stats.forEach { (label, value) ->
                Column(Modifier.padding(start = 22.dp)) {
                    Text(label.uppercase(), color = Color.White.copy(alpha = 0.45f), fontSize = 11.sp, letterSpacing = 3.sp)
                    Text(value, color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
private fun SimpleRowCard(title: String, subtitle: String, icon: ImageVector) {
    Card(shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(Color.White), modifier = Modifier.fillMaxWidth()) {
        Row(Modifier.padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(icon, null, tint = SSSColors.Blue, modifier = Modifier.size(28.dp))
            Spacer(Modifier.width(14.dp))
            Column {
                Text(title, color = SSSColors.Navy, fontSize = 20.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
                Text(subtitle, color = SSSColors.Muted)
            }
        }
    }
}

@Composable
private fun RecordList(title: String, records: JSONArray, titleKey: String, detailKey: String) {
    Card(shape = RoundedCornerShape(18.dp), colors = CardDefaults.cardColors(Color.White), modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text(title.uppercase(), color = SSSColors.Muted, letterSpacing = 4.sp)
            if (records.length() == 0) {
                Text("Nothing posted yet.", color = SSSColors.Muted)
            } else {
                (0 until records.length()).mapNotNull { records.optJSONObject(it) }.forEach {
                    Text(it.optString(titleKey), color = SSSColors.Navy, fontSize = 20.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Serif)
                    Text(it.optString(detailKey), color = SSSColors.Muted)
                }
            }
        }
    }
}

@Composable
private fun LoadingPanel() {
    Box(Modifier.fillMaxWidth().height(160.dp), contentAlignment = Alignment.Center) {
        CircularProgressIndicator(color = SSSColors.Amber)
    }
}

@Composable
private fun Segmented(items: List<String>, selectedIndex: Int, onSelected: (Int) -> Unit) {
    Row(Modifier.clip(RoundedCornerShape(22.dp)).background(Color(0x16000000)).padding(4.dp)) {
        items.forEachIndexed { index, item ->
            Box(
                Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(18.dp))
                    .background(if (index == selectedIndex) Color.White else Color.Transparent)
                    .clickable { onSelected(index) }
                    .padding(vertical = 9.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(item, color = SSSColors.Navy, fontWeight = FontWeight.Bold, fontSize = 13.sp)
            }
        }
    }
}

@Composable
private fun PortalField(label: String, value: String, onChange: (String) -> Unit, keyboard: KeyboardType = KeyboardType.Text, placeholder: String = "", password: Boolean = false) {
    OutlinedTextField(
        value = value,
        onValueChange = onChange,
        label = { Text(label) },
        placeholder = { if (placeholder.isNotBlank()) Text(placeholder) },
        modifier = Modifier.fillMaxWidth(),
        singleLine = true,
        keyboardOptions = KeyboardOptions(keyboardType = keyboard),
        visualTransformation = if (password) PasswordVisualTransformation() else androidx.compose.ui.text.input.VisualTransformation.None,
        shape = RoundedCornerShape(16.dp)
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun ClassPicker(selected: StudentClassChoice, onSelected: (StudentClassChoice) -> Unit) {
    var expanded by remember { mutableStateOf(false) }
    ExposedDropdownMenuBox(expanded = expanded, onExpandedChange = { expanded = !expanded }) {
        OutlinedTextField(
            value = selected.title,
            onValueChange = {},
            readOnly = true,
            label = { Text("Class / section") },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
            modifier = Modifier.menuAnchor().fillMaxWidth(),
            shape = RoundedCornerShape(16.dp)
        )
        ExposedDropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            StudentClassChoice.all.forEach {
                DropdownMenuItem(text = { Text(it.title) }, onClick = {
                    onSelected(it)
                    expanded = false
                })
            }
        }
    }
}

@Composable
private fun PrimaryButton(label: String, loading: Boolean, onClick: () -> Unit) {
    Button(
        onClick = onClick,
        enabled = !loading,
        modifier = Modifier.fillMaxWidth().height(54.dp),
        colors = ButtonDefaults.buttonColors(containerColor = SSSColors.Amber),
        shape = RoundedCornerShape(18.dp)
    ) {
        if (loading) CircularProgressIndicator(color = Color.White, strokeWidth = 2.dp, modifier = Modifier.size(22.dp)) else Text(label, fontWeight = FontWeight.Bold)
    }
}

private fun averageGrades(grades: JSONArray): Double {
    val values = mutableListOf<Double>()
    for (index in 0 until grades.length()) {
        val grade = grades.optJSONObject(index) ?: continue
        grade.scoreNumber("termOne", "term_one")?.let(values::add)
        grade.scoreNumber("termTwo", "term_two")?.let(values::add)
    }
    return if (values.isEmpty()) 0.0 else values.average()
}

private fun attendancePercent(records: JSONArray): Double {
    if (records.length() == 0) return 0.0
    var present = 0
    for (index in 0 until records.length()) {
        val status = records.optJSONObject(index)?.optString("status").orEmpty().lowercase()
        if (status == "present") present += 1
    }
    return present.toDouble() / records.length().toDouble() * 100.0
}

private fun JSONArray.toJsonObjects(): List<JSONObject> =
    (0 until length()).mapNotNull { optJSONObject(it) }

private fun JSONObject.scoreNumber(camelKey: String, snakeKey: String): Double? {
    val key = when {
        has(camelKey) && !isNull(camelKey) -> camelKey
        has(snakeKey) && !isNull(snakeKey) -> snakeKey
        else -> return null
    }
    val value = optDouble(key, Double.NaN)
    return value.takeIf { !it.isNaN() }
}

private fun JSONObject.scoreText(camelKey: String, snakeKey: String): String =
    scoreNumber(camelKey, snakeKey)?.let {
        if (it % 1.0 == 0.0) it.roundToInt().toString() else it.toString()
    }.orEmpty()

private fun cleanBusLabel(value: String): String {
    val cleaned = value.trim()
    return if (cleaned.isBlank() || cleaned.equals("null", ignoreCase = true)) "None" else cleaned
}

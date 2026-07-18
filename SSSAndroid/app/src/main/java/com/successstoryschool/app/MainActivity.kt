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
import androidx.compose.foundation.Canvas
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
import androidx.compose.foundation.layout.PaddingValues
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
import androidx.compose.material.icons.outlined.Cancel
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material.icons.outlined.CreditCard
import androidx.compose.material.icons.outlined.DirectionsBus
import androidx.compose.material.icons.outlined.FamilyRestroom
import androidx.compose.material.icons.outlined.GridView
import androidx.compose.material.icons.outlined.Groups
import androidx.compose.material.icons.outlined.HomeWork
import androidx.compose.material.icons.outlined.Logout
import androidx.compose.material.icons.outlined.Menu
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.School
import androidx.compose.material.icons.outlined.Schedule
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
import androidx.compose.material3.IconButton
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
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
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
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale
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

    val logoutAction = {
        scope.launch {
            PortalApi.post(session.role.logoutPath)
            onLogout()
        }
        Unit
    }

    BoxWithConstraints(Modifier.fillMaxSize().background(SSSColors.Paper)) {
        if (session.role == PortalRole.Student) {
            StudentScreenshotDashboard(session, payload, onLogout = logoutAction)
        } else if (maxWidth < 700.dp) {
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
    if (session.role == PortalRole.Student) {
        StudentScreenshotDashboard(session, payload, onLogout)
        return
    }

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
            is DashboardPayload.Teacher -> mobileTeacherItems(payload.assignments, payload.classroom)
            is DashboardPayload.Parent -> mobileParentItems(payload.data)
            is DashboardPayload.Student -> item { LoadingPanel() }
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

private object SSSStudentColors {
    val Background = Color(0xFFF4F2EE)
    val Card = Color.White
    val Navy = Color(0xFF1A2B4D)
    val NavySoft = Color(0xFF253556)
    val Muted = Color(0xFF727B8C)
    val Line = Color(0xFFEAE7E2)
    val Maroon = Color(0xFF7D2A40)
    val MaroonSoft = Color(0xFFF7ECEF)
    val MaroonChip = Color(0xFFF8EEF2)
    val Green = Color(0xFF08A879)
    val GreenSoft = Color(0xFFE9FFF6)
    val Amber = Color(0xFFEB8200)
    val AmberSoft = Color(0xFFFFF6E6)
    val BlueSoft = Color(0xFFEDF5FF)
    val MintSoft = Color(0xFFE9FFF5)
    val NeutralSoft = Color(0xFFF8F7F5)
}

private data class StudentMetric(
    val label: String,
    val value: String,
    val detail: String,
    val icon: ImageVector,
    val tint: Color,
    val background: Color
)

private data class AttendanceBreakdown(
    val total: Int,
    val present: Int,
    val absent: Int,
    val late: Int,
    val other: Int
) {
    val presentPercent: Int = percent(present)
    val absentPercent: Int = percent(absent)
    val latePercent: Int = percent(late)

    private fun percent(value: Int): Int =
        if (total == 0) 0 else (value.toDouble() / total.toDouble() * 100.0).roundToInt()
}

@Composable
private fun StudentScreenshotDashboard(session: Session, payload: DashboardPayload, onLogout: () -> Unit) {
    BoxWithConstraints(
        Modifier
            .fillMaxSize()
            .background(SSSStudentColors.Background)
    ) {
        val tabletMode = maxWidth >= 700.dp
        Column(Modifier.fillMaxSize()) {
            StudentDashboardTopBar(session, onLogout, tabletMode)
            when (payload) {
                DashboardPayload.Loading -> LoadingPanel()
                is DashboardPayload.Error -> Box(Modifier.fillMaxWidth().padding(22.dp)) {
                    Text(payload.message, color = SSSStudentColors.Maroon, fontWeight = FontWeight.Bold)
                }
                is DashboardPayload.Student -> StudentScreenshotContent(payload.data, tabletMode)
                else -> Box(Modifier.fillMaxWidth().padding(22.dp)) {
                    Text("Student dashboard unavailable.", color = SSSStudentColors.Maroon, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
private fun StudentDashboardTopBar(session: Session, onLogout: () -> Unit, tabletMode: Boolean = false) {
    Row(
        Modifier
            .fillMaxWidth()
            .height(if (tabletMode) 104.dp else 92.dp)
            .background(SSSStudentColors.Navy)
            .padding(horizontal = if (tabletMode) 42.dp else 24.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier
                .size(58.dp)
                .clip(RoundedCornerShape(18.dp))
                .background(Color.White),
            contentAlignment = Alignment.Center
        ) {
            Icon(Icons.Outlined.School, contentDescription = null, tint = SSSStudentColors.Navy, modifier = Modifier.size(31.dp))
        }
        Spacer(Modifier.width(16.dp))
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(1.dp)) {
            Text(session.name, color = Color.White, fontSize = 20.sp, lineHeight = 23.sp, fontWeight = FontWeight.ExtraBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text("${session.id} · ${session.role.title}", color = Color(0xFFCCDBF3), fontSize = 16.sp, lineHeight = 18.sp, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis)
        }
        Box(contentAlignment = Alignment.TopEnd) {
            IconButton(onClick = {}, modifier = Modifier.size(44.dp)) {
                Icon(Icons.Outlined.Notifications, contentDescription = "Notifications", tint = Color(0xFFD7E4F8), modifier = Modifier.size(27.dp))
            }
            Box(
                Modifier
                    .padding(top = 10.dp, end = 9.dp)
                    .size(8.dp)
                    .clip(CircleShape)
                    .background(SSSStudentColors.Maroon)
            )
        }
        Spacer(Modifier.width(4.dp))
        IconButton(onClick = onLogout, modifier = Modifier.size(44.dp)) {
            Icon(Icons.Outlined.Menu, contentDescription = "Sign out", tint = Color(0xFFD7E4F8), modifier = Modifier.size(30.dp))
        }
    }
}

@Composable
private fun StudentScreenshotContent(payload: JSONObject, tabletMode: Boolean = false) {
    val user = payload.optJSONObject("user") ?: JSONObject()
    val records = payload.optJSONObject("records") ?: JSONObject()
    val grades = records.optJSONArray("grades") ?: JSONArray()
    val attendance = records.optJSONArray("attendance") ?: JSONArray()
    val homework = records.optJSONArray("homework") ?: JSONArray()
    val announcements = records.optJSONArray("announcements") ?: JSONArray()
    val fees = records.optJSONArray("fees") ?: JSONArray()
    val updateCount = homework.length() + announcements.length()

    val metrics = listOf(
        StudentMetric("Status", studentStatusLabel(user), "Account access", Icons.Outlined.School, SSSStudentColors.Green, SSSStudentColors.MintSoft),
        StudentMetric("Class", user.optString("className", user.optString("requestedClassName", "Pending")).ifBlank { "Pending" }, "Homeroom", Icons.Outlined.GridView, SSSStudentColors.Navy, SSSStudentColors.BlueSoft),
        StudentMetric("Updates", updateCount.toString(), "Latest posts", Icons.Outlined.Notifications, SSSStudentColors.Navy, SSSStudentColors.BlueSoft),
        StudentMetric("Bus", cleanBusLabel(user.optString("transport")), "Transportation", Icons.Outlined.DirectionsBus, SSSStudentColors.Muted, SSSStudentColors.NeutralSoft)
    )

    LazyColumn(
        Modifier.fillMaxSize(),
        contentPadding = PaddingValues(horizontal = if (tabletMode) 42.dp else 20.dp, vertical = if (tabletMode) 34.dp else 28.dp),
        verticalArrangement = Arrangement.spacedBy(if (tabletMode) 24.dp else 18.dp)
    ) {
        item { StudentMetricGrid(metrics, columns = if (tabletMode) 4 else 2) }
        if (tabletMode) {
            item {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(24.dp)) {
                    Column(Modifier.weight(1.08f), verticalArrangement = Arrangement.spacedBy(24.dp)) {
                        StudentGradesPreview(grades)
                        StudentRecentAttendanceCard(attendance)
                        StudentHomeworkPreview(homework)
                    }
                    Column(Modifier.weight(0.92f), verticalArrangement = Arrangement.spacedBy(24.dp)) {
                        StudentAttendanceSummaryCard(attendance)
                        StudentNoticesPreview(announcements)
                        StudentFeesPreview(fees)
                    }
                }
            }
        } else {
            item { StudentGradesPreview(grades) }
            item { StudentAttendanceSummaryCard(attendance) }
            item { StudentRecentAttendanceCard(attendance) }
            item { StudentHomeworkPreview(homework) }
            item { StudentNoticesPreview(announcements) }
            item { StudentFeesPreview(fees) }
        }
    }
}

@Composable
private fun StudentMetricGrid(metrics: List<StudentMetric>, columns: Int = 2) {
    Column(verticalArrangement = Arrangement.spacedBy(18.dp)) {
        metrics.chunked(columns).forEach { row ->
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(18.dp)) {
                row.forEach { metric ->
                    StudentMetricTile(metric, Modifier.weight(1f))
                }
                if (row.size == 1) Spacer(Modifier.weight(1f))
            }
        }
    }
}

@Composable
private fun StudentMetricTile(metric: StudentMetric, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier.height(174.dp),
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = SSSStudentColors.Card),
        elevation = CardDefaults.cardElevation(3.dp)
    ) {
        Column(
            Modifier
                .fillMaxSize()
                .padding(24.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(metric.background),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(metric.icon, contentDescription = null, tint = metric.tint, modifier = Modifier.size(25.dp))
                }
                Spacer(Modifier.width(13.dp))
                Text(metric.label.uppercase(Locale.US), color = SSSStudentColors.Muted, fontSize = 12.sp, fontWeight = FontWeight.ExtraBold, letterSpacing = 2.8.sp, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
            Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                Text(metric.value.ifBlank { "--" }, color = SSSStudentColors.Navy, fontSize = 34.sp, lineHeight = 37.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Serif, maxLines = 1, overflow = TextOverflow.Ellipsis)
                Text(metric.detail, color = SSSStudentColors.Muted, fontSize = 18.sp, lineHeight = 21.sp, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
            }
        }
    }
}

@Composable
private fun StudentSectionCard(content: @Composable ColumnScope.() -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = SSSStudentColors.Card),
        elevation = CardDefaults.cardElevation(3.dp)
    ) {
        Column(Modifier.fillMaxWidth()) {
            content()
        }
    }
}

@Composable
private fun StudentSectionHeader(
    title: String,
    subtitle: String,
    icon: ImageVector,
    iconTint: Color = SSSStudentColors.Navy,
    iconBackground: Color = SSSStudentColors.BlueSoft,
    trailing: @Composable (() -> Unit)? = null
) {
    Row(
        Modifier
            .fillMaxWidth()
            .padding(horizontal = 26.dp, vertical = 24.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier
                .size(48.dp)
                .clip(CircleShape)
                .background(iconBackground),
            contentAlignment = Alignment.Center
        ) {
            Icon(icon, contentDescription = null, tint = iconTint, modifier = Modifier.size(25.dp))
        }
        Spacer(Modifier.width(14.dp))
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
            Text(title, color = SSSStudentColors.Navy, fontSize = 21.sp, lineHeight = 24.sp, fontWeight = FontWeight.ExtraBold)
            if (subtitle.isNotBlank()) {
                Text(subtitle, color = SSSStudentColors.Muted, fontSize = 16.sp, lineHeight = 19.sp, fontWeight = FontWeight.SemiBold)
            }
        }
        trailing?.invoke()
    }
}

@Composable
private fun StudentDivider() {
    Box(
        Modifier
            .fillMaxWidth()
            .height(1.dp)
            .background(SSSStudentColors.Line)
    )
}

@Composable
private fun StudentBadge(text: String, color: Color = SSSStudentColors.Maroon, background: Color = SSSStudentColors.MaroonChip) {
    Text(
        text = text.ifBlank { "--" },
        color = color,
        fontSize = 15.sp,
        lineHeight = 17.sp,
        fontWeight = FontWeight.ExtraBold,
        fontFamily = FontFamily.Monospace,
        textAlign = androidx.compose.ui.text.style.TextAlign.Center,
        modifier = Modifier
            .clip(CircleShape)
            .background(background)
            .padding(horizontal = 17.dp, vertical = 8.dp)
    )
}

@Composable
private fun StudentPrimaryButton(label: String, modifier: Modifier = Modifier, onClick: () -> Unit = {}) {
    Box(
        modifier
            .fillMaxWidth()
            .height(58.dp)
            .clip(RoundedCornerShape(22.dp))
            .background(SSSStudentColors.Maroon)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Text(label, color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.ExtraBold)
    }
}

@Composable
private fun StudentSoftButton(label: String, onClick: () -> Unit) {
    Box(
        Modifier
            .fillMaxWidth()
            .height(58.dp)
            .clip(RoundedCornerShape(20.dp))
            .background(SSSStudentColors.MaroonSoft)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Text(label, color = SSSStudentColors.Maroon, fontSize = 19.sp, fontWeight = FontWeight.ExtraBold)
    }
}

@Composable
private fun StudentGradesPreview(grades: JSONArray) {
    var expanded by remember(grades) { mutableStateOf(false) }
    val rows = grades.toJsonObjects().asReversed()
    StudentSectionCard {
        StudentSectionHeader(
            title = "Grades",
            subtitle = "${grades.length()} grades recorded",
            icon = Icons.Outlined.TrendingUp,
            trailing = { StudentBadge("${averageGrades(grades).roundToInt()}%", color = Color.White, background = SSSStudentColors.Navy) }
        )
        StudentDivider()
        if (rows.isEmpty()) {
            StudentEmptyState("No grades have been posted yet.")
        } else {
            rows.take(if (expanded) rows.size else 4).forEach { grade ->
                StudentGradeRow(grade)
                StudentDivider()
            }
            Column(Modifier.padding(horizontal = 28.dp, vertical = 24.dp)) {
                StudentSoftButton(if (expanded) "Show latest →" else "View full history →") { expanded = !expanded }
            }
        }
    }
}

@Composable
private fun StudentGradeRow(grade: JSONObject) {
    Row(
        Modifier
            .fillMaxWidth()
            .padding(horizontal = 28.dp, vertical = 20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(3.dp)) {
            Text(grade.optString("subject", "Subject"), color = SSSStudentColors.Navy, fontSize = 20.sp, lineHeight = 23.sp, fontWeight = FontWeight.ExtraBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
            Text(gradeDetail(grade), color = SSSStudentColors.Muted, fontSize = 16.sp, lineHeight = 19.sp, fontWeight = FontWeight.SemiBold, maxLines = 1, overflow = TextOverflow.Ellipsis)
        }
        StudentBadge("Latest grade", color = SSSStudentColors.Maroon, background = SSSStudentColors.MaroonChip)
        Spacer(Modifier.width(12.dp))
        Text(gradeDisplayScore(grade), color = SSSStudentColors.Maroon, fontSize = 20.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Monospace)
    }
}

@Composable
private fun StudentAttendanceSummaryCard(attendance: JSONArray) {
    val breakdown = attendanceBreakdown(attendance)
    StudentSectionCard {
        StudentSectionHeader(
            title = "Attendance",
            subtitle = "This term",
            icon = Icons.Outlined.CalendarMonth,
            trailing = { StudentBadge("${breakdown.presentPercent}%") }
        )
        StudentDivider()
        Column(Modifier.padding(horizontal = 28.dp, vertical = 24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            StudentAttendanceDonut(breakdown)
            Spacer(Modifier.height(18.dp))
            StudentAttendanceLegend("Present", breakdown.presentPercent, SSSStudentColors.Navy)
            StudentAttendanceLegend("Absent", breakdown.absentPercent, SSSStudentColors.Maroon)
            StudentAttendanceLegend("Late", breakdown.latePercent, SSSStudentColors.Amber)
            Spacer(Modifier.height(22.dp))
            StudentPrimaryButton("View records")
        }
    }
}

@Composable
private fun StudentAttendanceDonut(breakdown: AttendanceBreakdown) {
    Canvas(
        Modifier
            .size(236.dp)
            .padding(18.dp)
    ) {
        val strokeWidth = size.minDimension * 0.16f
        if (breakdown.total == 0) {
            drawArc(
                color = SSSStudentColors.Line,
                startAngle = -90f,
                sweepAngle = 360f,
                useCenter = false,
                style = Stroke(width = strokeWidth, cap = StrokeCap.Butt)
            )
            return@Canvas
        }
        var startAngle = -90f
        listOf(
            breakdown.present to SSSStudentColors.Navy,
            breakdown.absent to SSSStudentColors.Maroon,
            breakdown.late to SSSStudentColors.Amber,
            breakdown.other to SSSStudentColors.Line
        ).forEach { (count, color) ->
            if (count > 0) {
                val sweep = count.toFloat() / breakdown.total.toFloat() * 360f
                drawArc(
                    color = color,
                    startAngle = startAngle,
                    sweepAngle = (sweep - 2f).coerceAtLeast(1f),
                    useCenter = false,
                    style = Stroke(width = strokeWidth, cap = StrokeCap.Butt)
                )
                startAngle += sweep
            }
        }
    }
}

@Composable
private fun StudentAttendanceLegend(label: String, percent: Int, color: Color) {
    Row(
        Modifier
            .fillMaxWidth()
            .padding(vertical = 5.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            Modifier
                .size(15.dp)
                .clip(CircleShape)
                .background(color)
        )
        Spacer(Modifier.width(13.dp))
        Text(label, color = SSSStudentColors.Muted, fontSize = 18.sp, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
        Text("$percent%", color = SSSStudentColors.Navy, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Monospace)
    }
}

@Composable
private fun StudentRecentAttendanceCard(attendance: JSONArray) {
    var expanded by remember(attendance) { mutableStateOf(false) }
    val rows = attendance.toJsonObjects()
    StudentSectionCard {
        StudentSectionHeader(
            title = "Recent Attendance",
            subtitle = "",
            icon = Icons.Outlined.CalendarMonth,
            trailing = {
                Text(
                    if (expanded) "Latest" else "See all",
                    color = SSSStudentColors.Maroon,
                    fontSize = 17.sp,
                    fontWeight = FontWeight.ExtraBold,
                    modifier = Modifier.clickable { expanded = !expanded }
                )
            }
        )
        StudentDivider()
        if (rows.isEmpty()) {
            StudentEmptyState("No attendance records have been posted yet.")
        } else {
            rows.take(if (expanded) rows.size else 5).forEach { record ->
                StudentAttendanceRow(record)
                StudentDivider()
            }
        }
    }
}

@Composable
private fun StudentAttendanceRow(record: JSONObject) {
    val status = normalizedStatus(record.optString("status"))
    val styleColor = attendanceStatusColor(status)
    val rowBackground = if (status == "absent") SSSStudentColors.MaroonSoft else Color.White
    Row(
        Modifier
            .fillMaxWidth()
            .background(rowBackground)
            .padding(horizontal = 30.dp, vertical = 20.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
            Text(formatSchoolDate(record.optString("schoolDate", record.optString("school_date"))), color = SSSStudentColors.Navy, fontSize = 21.sp, lineHeight = 23.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Monospace)
            Text(if (status == "late") "2nd period" else "Full Day", color = SSSStudentColors.Muted, fontSize = 17.sp, lineHeight = 20.sp, fontWeight = FontWeight.SemiBold)
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(attendanceStatusIcon(status), contentDescription = null, tint = styleColor, modifier = Modifier.size(19.dp))
            Spacer(Modifier.width(8.dp))
            Text(status.replaceFirstChar { it.uppercase() }, color = styleColor, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
        }
    }
}

@Composable
private fun StudentHomeworkPreview(homework: JSONArray) {
    var expanded by remember(homework) { mutableStateOf(false) }
    val rows = homework.toJsonObjects()
    StudentSectionCard {
        StudentSectionHeader(
            title = "Homework",
            subtitle = "${homework.length()} assignments this week",
            icon = Icons.Outlined.Assignment,
            iconTint = SSSStudentColors.Amber,
            iconBackground = SSSStudentColors.AmberSoft,
            trailing = { StudentBadge("${homework.length()}\ntotal", color = SSSStudentColors.Amber, background = Color(0xFFFFF7E8)) }
        )
        StudentDivider()
        if (rows.isEmpty()) {
            StudentEmptyState("No homework has been posted yet.")
        } else {
            rows.take(if (expanded) rows.size else 4).forEach { item ->
                StudentHomeworkRow(item)
                StudentDivider()
            }
            Column(Modifier.padding(horizontal = 28.dp, vertical = 24.dp)) {
                StudentPrimaryButton(if (expanded) "Show latest assignments" else "View all assignments") { expanded = !expanded }
            }
        }
    }
}

@Composable
private fun StudentHomeworkRow(item: JSONObject) {
    Row(
        Modifier
            .fillMaxWidth()
            .padding(horizontal = 28.dp, vertical = 21.dp),
        verticalAlignment = Alignment.Top
    ) {
        Box(
            Modifier
                .size(28.dp)
                .clip(CircleShape)
                .border(BorderStroke(3.dp, Color(0xFFD8D3CC)), CircleShape)
        )
        Spacer(Modifier.width(18.dp))
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(item.optString("details", item.optString("subject", "Homework")), color = SSSStudentColors.Navy, fontSize = 20.sp, lineHeight = 26.sp, fontWeight = FontWeight.ExtraBold)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    item.optString("subject", "Homework"),
                    color = Color(0xFF1765F0),
                    fontSize = 14.sp,
                    fontWeight = FontWeight.ExtraBold,
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(Color(0xFFEAF2FF))
                        .padding(horizontal = 10.dp, vertical = 4.dp),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(Modifier.width(12.dp))
                Text(homeworkDueLabel(item), color = SSSStudentColors.Muted, fontSize = 14.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
            }
        }
    }
}

@Composable
private fun StudentNoticesPreview(announcements: JSONArray) {
    var expanded by remember(announcements) { mutableStateOf(false) }
    val rows = announcements.toJsonObjects()
    StudentSectionCard {
        StudentSectionHeader(
            title = "School Notices",
            subtitle = "",
            icon = Icons.Outlined.Announcement,
            trailing = {
                Box(
                    Modifier
                        .clip(RoundedCornerShape(15.dp))
                        .background(SSSStudentColors.Maroon)
                        .clickable { expanded = !expanded }
                        .padding(horizontal = 22.dp, vertical = 11.dp)
                ) {
                    Text(if (expanded) "Latest" else "View all", color = Color.White, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
                }
            }
        )
        StudentDivider()
        if (rows.isEmpty()) {
            StudentEmptyState("No school notices have been posted yet.")
        } else {
            rows.take(if (expanded) rows.size else 3).forEach { notice ->
                StudentNoticeRow(notice)
                StudentDivider()
            }
        }
    }
}

@Composable
private fun StudentNoticeRow(notice: JSONObject) {
    Column(
        Modifier
            .fillMaxWidth()
            .padding(horizontal = 28.dp, vertical = 22.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                noticeCategory(notice),
                color = SSSStudentColors.Maroon,
                fontSize = 14.sp,
                fontWeight = FontWeight.ExtraBold,
                modifier = Modifier
                    .clip(CircleShape)
                    .background(SSSStudentColors.MaroonChip)
                    .padding(horizontal = 12.dp, vertical = 5.dp)
            )
            Spacer(Modifier.width(13.dp))
            Text(formatCompactDate(notice.optString("postedAt", notice.optString("posted_at"))).ifBlank { "Posted" }, color = SSSStudentColors.Muted, fontSize = 14.sp, fontWeight = FontWeight.Bold, fontFamily = FontFamily.Monospace)
        }
        Text(notice.optString("title", "School notice"), color = SSSStudentColors.Navy, fontSize = 21.sp, lineHeight = 24.sp, fontWeight = FontWeight.ExtraBold)
        Text(notice.optString("details", "Posted by the school."), color = SSSStudentColors.Muted, fontSize = 18.sp, lineHeight = 25.sp, fontWeight = FontWeight.SemiBold, maxLines = 3, overflow = TextOverflow.Ellipsis)
    }
}

@Composable
private fun StudentFeesPreview(fees: JSONArray) {
    val rows = fees.toJsonObjects()
    val dueTotal = rows
        .filter { it.optString("status").equals("due", ignoreCase = true) }
        .sumOf { it.optDouble("amount", 0.0) }
    StudentSectionCard {
        StudentSectionHeader(
            title = "Fees",
            subtitle = if (rows.isEmpty()) "No balance posted" else "${rows.size} billing records",
            icon = Icons.Outlined.CreditCard,
            iconTint = SSSStudentColors.Maroon,
            iconBackground = SSSStudentColors.MaroonSoft,
            trailing = { StudentBadge(if (dueTotal > 0.0) formatFeeAmount(dueTotal) else "--") }
        )
        StudentDivider()
        if (rows.isEmpty()) {
            StudentEmptyState("No fee records have been posted yet.")
        } else {
            rows.take(4).forEach { fee ->
                Row(
                    Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 28.dp, vertical = 18.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(3.dp)) {
                        Text(fee.optString("label", "Fee item"), color = SSSStudentColors.Navy, fontSize = 19.sp, fontWeight = FontWeight.ExtraBold)
                        Text(fee.optString("status", "Open").replaceFirstChar { it.uppercase() }, color = SSSStudentColors.Muted, fontWeight = FontWeight.SemiBold)
                    }
                    Text(formatFeeAmount(fee.optDouble("amount", 0.0)), color = SSSStudentColors.Maroon, fontSize = 17.sp, fontWeight = FontWeight.ExtraBold, fontFamily = FontFamily.Monospace)
                }
                StudentDivider()
            }
        }
    }
}

@Composable
private fun StudentEmptyState(message: String) {
    Text(
        message,
        color = SSSStudentColors.Muted,
        fontSize = 17.sp,
        lineHeight = 23.sp,
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier.padding(horizontal = 28.dp, vertical = 24.dp)
    )
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

private fun studentStatusLabel(user: JSONObject): String {
    if (user.optBoolean("approved")) return "Active"
    return user.optString("approvalStatus", "Pending")
        .replace("_", " ")
        .replaceFirstChar { it.uppercase() }
        .ifBlank { "Pending" }
}

private fun gradeScores(grade: JSONObject): List<Double> =
    listOfNotNull(
        grade.scoreNumber("termOne", "term_one"),
        grade.scoreNumber("termTwo", "term_two")
    )

private fun gradeDisplayScore(grade: JSONObject): String {
    val scores = gradeScores(grade)
    if (scores.isEmpty()) return "--"
    val average = scores.average()
    return if (average % 1.0 == 0.0) average.roundToInt().toString() else String.format(Locale.US, "%.1f", average)
}

private fun gradeDetail(grade: JSONObject): String {
    val termOne = grade.scoreText("termOne", "term_one")
    val termTwo = grade.scoreText("termTwo", "term_two")
    return listOfNotNull(
        termOne.takeIf { it.isNotBlank() }?.let { "Term 1 $it" },
        termTwo.takeIf { it.isNotBlank() }?.let { "Term 2 $it" }
    ).joinToString(" · ").ifBlank { "Grade posted" }
}

private fun attendanceBreakdown(records: JSONArray): AttendanceBreakdown {
    var present = 0
    var absent = 0
    var late = 0
    var other = 0
    for (index in 0 until records.length()) {
        when (normalizedStatus(records.optJSONObject(index)?.optString("status").orEmpty())) {
            "present" -> present += 1
            "absent" -> absent += 1
            "late" -> late += 1
            else -> other += 1
        }
    }
    return AttendanceBreakdown(records.length(), present, absent, late, other)
}

private fun normalizedStatus(value: String): String =
    value.trim().lowercase(Locale.US).ifBlank { "present" }

private fun attendanceStatusColor(status: String): Color =
    when (status) {
        "present" -> SSSStudentColors.Green
        "absent" -> SSSStudentColors.Maroon
        "late" -> SSSStudentColors.Amber
        else -> SSSStudentColors.Muted
    }

private fun attendanceStatusIcon(status: String): ImageVector =
    when (status) {
        "present" -> Icons.Outlined.CheckCircle
        "absent" -> Icons.Outlined.Cancel
        "late" -> Icons.Outlined.Schedule
        else -> Icons.Outlined.CalendarMonth
    }

private fun homeworkDueLabel(item: JSONObject): String {
    val dueDate = item.optString("dueDate", item.optString("due_date"))
    return formatCompactDate(dueDate).takeIf { it.isNotBlank() }?.let { "Due  $it" } ?: "Class post"
}

private fun noticeCategory(notice: JSONObject): String {
    val text = "${notice.optString("title")} ${notice.optString("details")}".lowercase(Locale.US)
    return when {
        "exam" in text || "schedule" in text || "grade" in text -> "Academic"
        "homework" in text || "assignment" in text -> "Homework"
        "meeting" in text || "event" in text || "trip" in text -> "Event"
        notice.optString("audience").equals("class", ignoreCase = true) -> "Class"
        else -> "School"
    }
}

private fun formatSchoolDate(value: String): String {
    val trimmed = value.trim()
    if (trimmed.isBlank()) return "School day"
    val datePart = trimmed.take(10)
    return runCatching {
        LocalDate.parse(datePart).format(DateTimeFormatter.ofPattern("MMM dd, yyyy", Locale.US))
    }.getOrDefault(trimmed)
}

private fun formatCompactDate(value: String): String {
    val trimmed = value.trim()
    if (trimmed.isBlank()) return ""
    val datePart = trimmed.take(10)
    return runCatching {
        LocalDate.parse(datePart).format(DateTimeFormatter.ofPattern("MMM dd", Locale.US))
    }.getOrDefault(trimmed)
}

private fun formatFeeAmount(value: Double): String =
    if (value % 1.0 == 0.0) "${value.roundToInt()} JOD" else String.format(Locale.US, "%.2f JOD", value)

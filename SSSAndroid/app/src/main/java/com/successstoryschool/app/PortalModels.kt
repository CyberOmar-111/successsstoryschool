package com.successstoryschool.app

enum class PortalRole(val title: String, val loginPath: String, val logoutPath: String, val idLabel: String, val placeholder: String) {
    Student("Student", "/api/auth/login", "/api/auth/logout", "Student ID", "SSS-001"),
    Teacher("Teacher", "/api/teacher/login", "/api/teacher/logout", "Teacher ID", "TCH-001"),
    Parent("Parent", "/api/parent/login", "/api/parent/logout", "Email or username", "parent@email.com")
}

enum class AuthMode(val title: String) {
    SignIn("Sign in"),
    CreateAccount("Create account")
}

data class Session(val role: PortalRole, val id: String, val name: String)

data class StudentClassChoice(val code: String, val title: String) {
    companion object {
        val all = listOf(
            StudentClassChoice("10-A", "Grade 10 A - Boys"),
            StudentClassChoice("10-B", "Grade 10 B - Girls"),
            StudentClassChoice("9-A", "Grade 9 A - Boys"),
            StudentClassChoice("9-B", "Grade 9 B - Boys"),
            StudentClassChoice("9-C", "Grade 9 C - Girls"),
            StudentClassChoice("8-A", "Grade 8 A - Boys"),
            StudentClassChoice("8-B", "Grade 8 B - Boys"),
            StudentClassChoice("8-C", "Grade 8 C - Girls"),
            StudentClassChoice("8-D", "Grade 8 D - Girls")
        )
    }
}

sealed interface ScreenState {
    data object Login : ScreenState
    data class Dashboard(val session: Session) : ScreenState
}

sealed interface DashboardPayload {
    data object Loading : DashboardPayload
    data class Student(val data: org.json.JSONObject) : DashboardPayload
    data class Teacher(val assignments: org.json.JSONArray, val classroom: org.json.JSONObject?) : DashboardPayload
    data class Parent(val data: org.json.JSONObject) : DashboardPayload
    data class Error(val message: String) : DashboardPayload
}

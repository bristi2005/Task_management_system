allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}

subprojects {
    project.evaluationDependsOn(":app")
}

subprojects {
    val subproject = this
    val applyCompileSdk = {
        if (subproject.hasProperty("android")) {
            val android = subproject.extensions.getByName("android")
            try {
                val method = android.javaClass.getMethod("compileSdkVersion", Int::class.javaPrimitiveType)
                method.invoke(android, 36)
            } catch (e: Exception) {
                try {
                    val method = android.javaClass.getMethod("compileSdkVersion", String::class.java)
                    method.invoke(android, "android-36")
                } catch (e2: Exception) {}
            }
        }
    }
    
    if (subproject.state.executed) {
        applyCompileSdk()
    } else {
        subproject.afterEvaluate { applyCompileSdk() }
    }
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}

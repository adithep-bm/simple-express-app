pipeline {
    agent any

 tools {
        nodejs 'nodejs'  // <-- Use the exact name from Global Tool Configuration
    }


    stages {
        stage('Checkout') {
            steps {
                git branch: 'feature/lab', url: 'https://github.com/adithep-bm/simple-express-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npx sonar-scanner -Dsonar.projectKey=sonarqube-integrated-docker'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

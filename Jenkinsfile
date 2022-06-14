pipeline {
    agent any
    stages {
        stage('---pull code from github---') {
            steps {
                sh "git pull origin master"
            }
        }
        stage('build') {
            steps {
                sh "ng build"
            }
        }
       
    }
}

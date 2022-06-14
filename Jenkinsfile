pipeline {
    agent any
    stages {
        stage('---pull code from github---') {
            steps {
              bat 'git pull origin ${params.GIT_BRANCH}' 
            }
        }
       
       
    }
}

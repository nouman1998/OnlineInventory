pipeline {
  
   
    agent any
    stages {
        stage('---pull code from github---') {
            steps {
              bat 'git checkout qa'
              bat 'git pull origin qa' 
            }
        }
       
       
    }
}

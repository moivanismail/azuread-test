pipeline {
    agent { label 'master' }
    stages {
        stage('Build and deploy for prooduction') {
            when {
                branch 'staging' 
            }
            steps {
                sh '''
                    rm -rf ./.env
                    cp /home/jenkins/projects/expresswebapp/.env-staging ./.env

                    if [ "$(docker ps -a -q -f name=expresswebapp-staging)" ]; then
                        docker stop expresswebapp-staging
                        docker rm expresswebapp-staging
                    fi
                    docker build -t expresswebapp-staging .
                    docker run -d -p 8001:3000 --restart=on-failure:10 --name expresswebapp-staging expresswebapp-staging
                '''
                
            }
        }
    }
}
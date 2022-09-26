pipeline {
    // agent {
    //     label 'Built-In Node'
    // }

    agent any

    environment {
      GITURL= 'https://github.com/SLHolmess/project3.git'
      IMAGE = "slholmess/books"
      IMAGE_REGISTRY = "https://index.docker.io/v1/"
      registryCredential = 'minh-dockerhub'
      gitCredential = 'minh-github'
      gitCredentialssh = "minh-github-sshkey"
      private_ssh_key_path = "/root/.ssh/id_rsa"

      // deployment repo
      BUILD_USER = 'SLHolmess'
      BUILD_USER_EMAIL = 'ngocminh2962000@gmail.com'
      DEPLOYMENT_URL = 'git@github.com:SLHolmess/project3.git'
    }

    stages {
        // stage('Check-out GIT'){
        //     steps{
        //         // git credentialsId: "$gitCredential", url: "$GITURL"
        //         git url:'https://github.com/SLHolmess/project3', branch:'main'
        //     }
        // }

        stage('build-image'){
            steps {
                script {
                    env.TIMESTRAP = sh(returnStdout: true, script: 'date +%Y%m%d%H%M%S').trim()
                    env.DOCKER_TAG = "${TIMESTRAP}_${BUILD_NUMBER}"
                    sh 'docker build ./services/books -t $IMAGE:$DOCKER_TAG'
                }
            }
        }   

        stage("push Image ") {
            steps{
                script {
                    docker.withRegistry( "$IMAGE_REGISTRY", registryCredential ) {
                    sh 'docker push $IMAGE:$DOCKER_TAG'
                    }
                }
            }
        }

        stage("update docker tag") {
            steps {
                    withCredentials([sshUserPrivateKey(credentialsId: 'minh-github-sshkey', keyFileVariable: '/root/.ssh/id_rsa')]) {
                    sh """
                        git config --global user.name "$BUILD_USER"
                        git config --global user.email "$BUILD_USER_EMAIL"
                        ls
                        rm -rf project3
                        git clone ${DEPLOYMENT_URL} && cd project3 && git checkout book-service && \
                        sed -i "s#$IMAGE.*#${IMAGE}:${DOCKER_TAG}#g" k8s-config/books/books-deployment.yaml && \
                        cat k8s-config/books/books-deployment.yaml && cat services/books/app/books.js && git status && git add . && git commit -m "update tag: ${DOCKER_TAG}" && git config --list && \
                        git push ${DEPLOYMENT_URL}
                    """
                }
                
            }
        }    
    }
    post { 
      always {
            echo  "End pipeline"
        }
    }
}
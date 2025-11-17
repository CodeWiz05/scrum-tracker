// Jenkinsfile
pipeline {
    agent any
    
    tools {
        // Use the exact name you created in step 4
        nodejs 'My-NodeJS' 
    }

    stages {    
        stage('Build Backend') {
            steps {
                dir('backend') {
                    // CHANGED 'sh' to 'bat'
                    bat 'npm install'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    // CHANGED 'sh' to 'bat'
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    // CHANGED 'sh' to 'bat'
                    bat 'npm test'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    // CHANGED 'sh' to 'bat'
                    bat 'npm test'
                }
            }
        }

        stage('Deploy') {
            when { branch 'main' }
            steps {
                echo 'Deploying application...'
                
                // IMPORTANT: Your old deploy step was for Linux.
                // This is the new Windows-equivalent.
                bat '''
                    echo "Copying frontend files..."
                    xcopy frontend\\dist C:\\inetpub\\wwwroot /E /Y /I
                    
                    
                    echo "Stopping any old server..."
                    taskkill /F /IM node.exe 2>nul || echo "Server not running."

                    echo "Starting new server in its own window..."
                    cd backend
                    start "Scrum Backend Server" node server.js
                '''
                
                echo 'Deployment complete.'
            }
        }
    }
}
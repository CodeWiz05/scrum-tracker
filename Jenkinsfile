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
                    
                    echo "Restarting backend server..."
                    taskkill /F /IM node.exe /FI "MODULES eq server.js" 2>nul || echo "Server not running, starting new one..."
                    
                    cd backend
                    START /B "backend-server" node server.js > app.log 2>&1
                '''
                
                echo 'Deployment complete.'
            }
        }
    }
}
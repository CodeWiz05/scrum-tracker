// Jenkinsfile
pipeline {
    agent any

    stages {
        stage('Build Backend') {
            steps {
                // Go into the backend folder and install dependencies
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                // Go into the frontend folder, install, and build
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build' // This creates the 'frontend/dist' folder
                }
            }
        }

        stage('Test Backend') {
            steps {
                // Run the backend Jest tests
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
        
        stage('Test Frontend') {
            // This is a bonus stage. If frontend tests fail, skip it.
            // If they work, it's a huge plus.
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            // IMPORTANT: Only run this deploy step on the 'main' branch
            when { branch 'main' }
            steps {
                echo 'Deploying application...'
                // This is the "no-docker" deploy.
                // It copies the built frontend files to a web server
                // and restarts the backend process.
                
                // 1. Copy frontend files to Nginx (or Apache) root
                //    (Change this path to your server's web root)
                sh 'sudo cp -R frontend/dist/* /var/www/html/'
                
                // 2. Kill any old 'server.js' process
                sh 'pkill -f "node server.js" || true'
                
                // 3. Go to backend folder and start the server in the background
                sh '''
                    cd backend && \
                    nohup node server.js > app.log 2>&1 &
                '''
                
                echo 'Deployment complete.'
            }
        }
    }
    
    post {
        // Always clean up the workspace
        always {
            cleanWs()
        }
    }
}
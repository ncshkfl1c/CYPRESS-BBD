/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any

    parameters {
        /* groovylint-disable-next-line LineLength */
        string(name: 'SPEC', defaultValue: 'BBD-TEST/cypress/e2e/**/**', description: 'Enter the scripts path that you want to excute')
        /* groovylint-disable-next-line LineLength */
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'edge'], description: 'Choice the browser you want to execute')
    }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Deloying') {
            steps {
                echo 'Building the application'
            }
        }
        stage('Testing') {
            steps {
                bat 'npn i'
                bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        /* groovylint-disable-next-line DuplicateStringLiteral */
        stage('Deloying') {
            steps {
                echo 'Deploy the application'
            }
        }
    }

    post {
        always {
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFile: 'index.html', reportName: 'HTML Report', reportTitle:''])
        }
    }
}


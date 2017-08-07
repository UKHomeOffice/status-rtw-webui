#!/usr/bin/env groovy

registryPath = "registry.ipttools.io/status-web-ui"
releaseVersion = "1.1"
branch = "${env.BRANCH_NAME}"
imageTag = (registryPath + "-${branch}" + ":" + releaseVersion).toLowerCase()
timeStamp   = new Date().format("yyyy-MM-dd-HH-mm-ss", TimeZone.getTimeZone('UTC'));

node ('docker_slave') {
    stage ("Checkout scm") {
        checkout scm
        sh "git checkout ${branch}"
    }
    stage ("Build and deploy docker image") {
        def arguments = "--build-arg ARTEFACT_REPO=https://registry.ipttools.io:8081/repository/docker_resources --build-arg VAULT_ADDR=$VAULT_ADDR --build-arg VAULT_TOKEN=$VAULT_TOKEN"
            stage "Checkout scm"
            checkout scm

            stage "Run NPM Install"
	    sh "npm install"

            stage "Copy fonts"
            sh "npm run copyfonts"            

            stage "Docker build"
            sh "find . -name docker-entrypoint.sh | xargs chmod a+x || :"
            sh "docker build ${arguments} -t ${imageTag}-${timeStamp} --compress --pull ."

            stage "Docker push"
            sh "docker push ${imageTag}-${timeStamp}"

            stage "Job completion"
            println "The job completed successfully"
            println "The new image is " + imageTag + "-" + timeStamp
    }
    stage ("Update repo") {
        sh "git config --global user.email \"andrew.turnelty+docker@uk.ibm.com\" && git config --global user.name \"jenkins-docker\""
        sh "git tag -a ${releaseVersion}-${branch}-${timeStamp} -m 'Docker tag - ${releaseVersion}-${branch}-${timeStamp}' && git push --tags"
    }
    stage ("Deployment Configuration Update") {
        def updateDataString = """[
            {
                "filename": "applications/ipt-rtw/ipt-rtw-web-ui/docker.app.properties",
                "modifications": [
                    {
                    "keyName": "DOCKER_APP_IMAGE",
                    "type": "property",
                    "valueData": "${imageTag}-${timeStamp}"
                    }
                ]
            }
        ]""";
        updateDeployment('extstatus',branch,updateDataString);
    }
}

EXTERNAL_PORT=8081
INTERNAL_PORT=80

docker run -p ${EXTERNAL_PORT}:${INTERNAL_PORT} -e CONFIGURATION_SWAGGER_PORT=${EXTERNAL_PORT} --name exporter_trigger exporter_trigger:latest &

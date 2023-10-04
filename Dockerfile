FROM node:18-alpine
LABEL name="NodeJs CICD" \
    version="1.0.0" \
    org.label-schema.vendor="Microgravvity"
WORKDIR /usr/src/app
COPY ./ ./
RUN apk --no-cache add ca-certificates \
    && apk add --update tzdata \
    && cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime \
    && apk del tzdata
EXPOSE 3034
CMD [ "npm", "start" ]

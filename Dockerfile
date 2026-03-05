FROM ubuntu:latest
LABEL authors="louischan"

ENTRYPOINT ["top", "-b"]

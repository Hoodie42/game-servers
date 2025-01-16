FROM ubuntu:24.04

RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get -y install git unzip

RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:dotnet/backports
RUN apt update -q && apt-get install -y dotnet-sdk-9.0 dotnet-sdk-8.0

RUN git clone --recursive https://github.com/space-wizards/SS14.Watchdog
RUN cd SS14.Watchdog && dotnet publish -c Release --no-self-contained

EXPOSE 1212/tcp
EXPOSE 1212/udp

COPY appsettings.yml /SS14.Watchdog/SS14.Watchdog/bin/Release/net8.0/appsettings.yml
COPY start.sh /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["FitnessTracker.Api/FitnessTracker.Api.csproj", "FitnessTracker.Api/"]
RUN dotnet restore "FitnessTracker.Api/FitnessTracker.Api.csproj"
COPY . .
WORKDIR "/src/FitnessTracker.Api"
RUN dotnet build "FitnessTracker.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FitnessTracker.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "FitnessTracker.Api.dll"]
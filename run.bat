@echo off
echo =============================================================
echo   ABHISHEK SAXENA - DIGITAL MARKETING EXECUTIVE PORTFOLIO
echo   Tagline: BUILD. OPTIMIZE. GROW.
echo =============================================================
echo.

:: Check if Node is available
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting local web server using Node.js...
    start http://localhost:3000
    node server.js
    goto end
)

:: Check if Java is available
where java >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting local web server using Java...
    start http://localhost:8080
    java PortfolioServer.java
    goto end
)

:: Fallback: Open index.html directly in default browser
echo Opening portfolio directly in default web browser...
start index.html

:end

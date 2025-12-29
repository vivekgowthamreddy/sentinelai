@echo off
echo ===================================================
echo      SENTINEL AI - ACTIVE DEFENSE DEMO
echo ===================================================
echo.
echo [1] Resetting System to NORMAL state...
curl -X POST http://localhost:8000/api/defense/reset
echo.
echo.

echo [2] Simulating BROWSER Access to Malware (Level 0)...
python -c "import requests; print(requests.post('http://localhost:8000/browser/navigate', json={'url':'http://malware-test.com'}).json())"
echo (Expected: ALLOWED)
echo.

echo [3] TRIGGERING ACTIVE DEFENSE (High Risk Threat)...
python -c "import requests; requests.post('http://localhost:8000/immune-check', json={'text':'DROP TABLE users;', 'url':'', 'child_mode':False, 'network_risk':'High'})"
echo System is now in ACTIVE DEFENSE.
echo.

echo [4] EVOLVING DEFENSE SYSTEM (Level 1 -> 2 -> 3)...
curl -X POST http://localhost:8000/api/defense/evolve
curl -X POST http://localhost:8000/api/defense/evolve
curl -X POST http://localhost:8000/api/defense/evolve
echo.

echo [5] Simulating BROWSER Access to Malware (Level 3)...
python -c "import requests; print(requests.post('http://localhost:8000/browser/navigate', json={'url':'http://malware-test.com'}).json())"
echo (Expected: BLOCKED)
echo.

echo [6] Simulating BROWSER Access to Unknown Site (Level 3)...
python -c "import requests; print(requests.post('http://localhost:8000/browser/navigate', json={'url':'http://unknown.com'}).json())"
echo (Expected: BLOCKED)
echo.

echo [7] Simulating BROWSER Access to Trusted Site (Google)...
python -c "import requests; print(requests.post('http://localhost:8000/browser/navigate', json={'url':'http://google.com'}).json())"
echo (Expected: ALLOWED)
echo.

echo ===================================================
echo    DEMO COMPLETE - SYSTEM TAKEOVER VERIFIED
echo ===================================================
pause

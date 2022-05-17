@ECHO off


set fileName=jre
if exist jre (
  rmdir /s /q jre
)

curl -L https://github.com/Efratror/Processing-JRE/releases/download/V0.01/processing-jre-v0.01-windows.zip >> %fileName%.zip || goto :error
tar -xf "%cd%\%fileName%.zip" || goto :error
ren "windows" "%fileName%" || goto :error
del %fileName%.zip

goto :end

:error
exit /B 1

:end
cd install 2>>nul
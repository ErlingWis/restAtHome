sudo cp restAtHome.service /etc/systemd/system
sudo mkdir -p /etc/restAtHome
sudo cp config /etc/restAtHome
cd ..
cp -r bin /opt/restAtHome
sudo ln -s /opts/restAtHome/restCli /usr/local/bin/restCli

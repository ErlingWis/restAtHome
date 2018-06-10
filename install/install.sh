if ! [ -x "$(command -v node)" ]; then
  echo 'node is not installed.'
  echo 'You can find instructions on how to install here:'
  echo 'https://nodejs.org/en/download/package-manager/'
  exit 1
elif ! [ -x "$(command -v npm)" ]; then
  echo 'npm is not installed.'
  echo 'npm is usually shipped alongside node installations.'
  echo 'You can find instructions on how to install here:'
  echo 'https://nodejs.org/en/download/package-manager/'
  exit 1
elif ! [ -x "$(command -v mongod)" ]; then
  echo 'mongodb is not installed.'
  echo 'You can find instructions on how to install here:'
  echo 'https://docs.mongodb.com/manual/administration/install-on-linux/'
  exit 1
fi

DIR=`pwd`
ROOT="$DIR/restAtHome"
echo 'Cloning repo'
git clone --quiet https://github.com/ErlingWis/restAtHome.git

echo 'installing service file at /etc/systemd/system/restAtHome.service'
# install service file
sudo cp $ROOT/install/restAtHome.service /etc/systemd/system

echo 'installing config file at /etc/restAtHome/config'
#install config file
sudo mkdir -p /etc/restAtHome
sudo cp $ROOT/install/config /etc/restAtHome


echo 'Extracting runnables to /opt/restAtHome'
#extract runnables to /opt
sudo cp -r $ROOT/bin /opt/restAtHome
echo 'installing dependencies'
cd /opt/restAtHome
#install dependencies
sudo npm install /opt/restAtHome

echo 'adding restCli to /usr/local/bin/restCli'
#add restCli to PATH
sudo ln -s /opt/restAtHome/restCli /usr/local/bin/restCli

echo 'removing repo'
rm -rf $ROOT

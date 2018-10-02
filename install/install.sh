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

echo 'installing config file at /etc/restAtHome/restAtHome.conf'
#install config file
sudo mkdir -p /etc/restAtHome
sudo cp $ROOT/install/restAtHome.conf /etc/restAtHome


echo 'Extracting runnables to /opt/restAtHome'
#extract runnables to /opt
sudo cp -r $ROOT/bin /opt/restAtHome
sudo chown $USER:$USER /opt/restAtHome

echo 'installing dependencies'
cd /opt/restAtHome
#install dependencies
npm install /opt/restAtHome > /dev/null 2>&1

rm -rf $ROOT

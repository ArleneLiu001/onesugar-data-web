npm run prd

rm -rf ./release

mkdir release

cp -r dist/ release/fee.usoftchina.com

scp -r release/fee.usoftchina.com basic.feevue:~/

now=`date +%Y%m%d%H%M`

ssh -tt basic.feevue << pub
  #备份
  echo $now
  sudo cp -r /data/www/fee.usoftchina.com/ /data/backup/fee.usoftchina.com/backup-$now
  sudo rm -rf /data/www/fee.usoftchina.com
  sudo cp -r ~/fee.usoftchina.com /data/www
  exit
pub
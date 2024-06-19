npm run stg

rm -rf ./release

mkdir release

cp -r dist/ release/fee.uuzcc.cn

scp -r release/fee.uuzcc.cn ytbjdocker.feevue:~/

now=`date +%Y%m%d%H%M`

ssh -tt ytbjdocker.feevue << pub
  #备份
  echo $now
  sudo mkdir -p /data/backup/fee.uuzcc.cn
  sudo cp -r /data/www/fee.uuzcc.cn/ /data/backup/fee.uuzcc.cn/backup-$now
  sudo rm -rf /data/www/fee.uuzcc.cn
  sudo cp -r ~/fee.uuzcc.cn /data/www
  exit
pub
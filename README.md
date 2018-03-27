# git 命令集
#$ git init //将当前文件变成一个库
#$ git add +filename //将工作区修改过的文件放入暂存区
#$ git commit -m "" //创建版本 以及加入版本标记
#$ git config --global user.email "you@example.com" //设置你的邮箱地址
#$ git config --global user.name "Your Name"  //设置你的用户名
#$ git status //查看库的状态
#$ git diff +filename //查看工作区中对filename做了哪些改动
#$ git log//查看现在最近到最远的所有库版本
#$ git log --pretty=oneline //功能同上 就是简化了信息
#$ git reset --hard HEAD^//指向上个版本
#$ git reset --hard HEAD^^//指向上上个版本
#$ git reset --hard +commit.id //指向commit.id 的文件版本
#$ git reflog //查看历史版本 commit.id
#$ git checkout -- filename //撤销工作区filename文件的修改 还有一种功能就是将版本库中的最新文件替换到工作区中 类似于还原
#$ git reset HEAD +filename //撤销filename在暂存区的修改，使得文件回到工作区的修改
#$ git rm +filename //删除 filename文件
#$ ssh-keygen -t rsa -C "you@example.com"//创建ssh秘钥 用于与github之间创建安全连接  去用户文件夹下查看是否拥有了 .ssh文件夹
#$ git remote add origin git@github.com:xxx/learngit.git //其中 origin 是远程库 github 的库名 也可以修改成任意想要的名字
#$ git push -u origin master //第一次将库文件发送到GitHub远程库中
#$ git push origin master//将此时库文件发送到GitHub远程库中（更新）
#$ git config --global branch.autosetuprebase always //避免PULLING提交合并 （远程库）
#$ git config --global color.ui true //设置颜色
#$ git config --global color.status auto //同上
#$ git config --global color.branch auto //同上
#$ git branch name //创建分支 
#$ git branch -a //查看本地分支和远程分支
#$ git checkout name //切换分支
#$ git merge name //合并某分支到当前分支
#$ git log --graph --pretty=oneline --abbrev-commit //查看当前分支合并情况
#
#//遇到本地库无法上传至远程库时
#$ git pull origin 
#$ git merge origin master
#$ git push origin //先pull远程仓库，然后和本地仓库合并，最后提交即可。
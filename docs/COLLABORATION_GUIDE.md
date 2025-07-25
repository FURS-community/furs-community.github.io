# 开发的小伙伴请依据此教程完成git配置，后续请自行推送代码，无需在群里发送代码文件

- [兽研会|FURS](https://furs-community.github.io/)

---

## 多人协作项目完整工作流指南

## 一、项目初始化与克隆

- 本地初始化（可选）

```bash
git init
```

- 从远程仓库克隆

```bash
git clone https://github.com/FURS-community/furs-community.github.io.git
```

## 二、日常开发流程（本地操作）

- 新建功能分支

```bash
git checkout -b feat/describe
```

- 查看状态

```bash
git status
```

- 添加文件到暂存区

```bash
git add filename
git add .
```

注意：空文件夹并不会被git跟踪

- 提交变更

```bash
 git commit -m "feat: describe"
```

- 推送到远程

```bash
git push origin feat/describe
```

## 三、协作开发，自动合并

- 切换主分支并拉取到最新代码

```bash
git checkout main
git pull origin main
```

- 合并到主分支

```bash
git merge feat/describe
```

### 注意：如果出现冲突

- - 使用VC code解决（其他也可以）
- - 冲突解决后

```bash
git add .
git commit
```

- 推送合并后的主分支

```bash
git push origin main
```

## 四、清理工作

- 删除合并后的功能分支

```bash
#本地
git branch -d feat/describe
#远程
git push origin --delete feat/describe
```

## 五、补充

- 查看分支

```bash
#本地
git branch
#远程
git branch -r
```

- 删除文件跟踪（保留本地）

```bash
git rm --cached filename
```

---

## 后续提交方法（上述初始工作已完成）

```bash
git add .
git commit -m "deacribe"
git push origin main
```

## 注意：每次提交之后在群里说明

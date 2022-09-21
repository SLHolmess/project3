# 1. Deploy addons
## 1.1. nginx ingress controller
```
cd <dir>/k8s-config/addons/nginx-ingress/ && bash install.sh
```

## 1.2. argocd
```
cd <dir>/k8s-config/addons/argocd/ && bash install.sh
```

## 1.3. metalb
```
cd <dir>/k8s-config/addons/metalb/ && bash install.sh
```

# 2. Deploy application
## 2.1. storage
```
cd <dir>/k8s-config/ && kubectl apply -f ./storage
```

## 2.2. services
```
Using argocd
```
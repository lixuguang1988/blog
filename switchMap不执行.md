```javascript
    this.route.paramMap.switchMap((params: ParamMap) =>{
      console.log(params, params.get('id'));
      return this.apiService.getTopic(params.get('id'))
    }).subscribe(res=>{
      this.topic = res;
    });
```
switchMap 里面的内容不执行，还有人遇到过

原因
```javascript
const AppRouting: Routes = [
  //第一个route放后面
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CnodeComponent
  },
  {
    path: 'topic/:id',
    component: CnodeDetailComponent
  }
];
```

# input获得焦点但没有光标无法输入
  ```jsx
      <FormItem>
        {
        getFieldDecorator('title', {
            initialValue: record.title,
            rules: [
                {
                    required: true,
                    message: '标题不能为空'
                },
                {
                    max: 32,
                    message: '标题最大长度为32个字符'
                }
            ]
        })(
            <Input type="text" size="large" placeholder="请输入标题" />
        )
        }
    </FormItem>
    <div className="ue-editor">
        <iframe ref={ node => this.contentIfr = node } src="/ueditor/index.html" frameBorder="none" width="100%" height="1000px" />
    </div>  
  ```
  ```js
      componentDidMount(){
        const contentIfr = this.contentIfr
        const record = this.state.record
        this._isMounted = true
        if(record){
             contentIfr.onload =  function(){
                 setTimeout(()=>{
                     contentIfr.contentWindow.ue.setContent(record.content)
                 }, 0)
             }
        }
    }

    componentWillUnmount(){
        this._isMounted = false
    }
  ```
  
  把iframe去了，引入react-iframe，然后在onLoad是重新做了 我用ref做的事情，然后加入_isMounted标识
  ```jsx
      <FormItem>
        {
        getFieldDecorator('title', {
            initialValue: record.title,
            rules: [
                {
                    required: true,
                    message: '标题不能为空'
                },
                {
                    max: 32,
                    message: '标题最大长度为32个字符'
                }
            ]
        })(
            <Input type="text" size="large" placeholder="请输入标题" />
        )
        }
    </FormItem>
    <div className="ue-editor">
    <Iframe url="/ueditor/index.html"
            width="100%"
            height="1000px"
            id="iframe"
            className="myClassname"
            display="initial"
            position="relative"
            onLoad={this.handleIframeLoad}
            allowFullScreen/>
        {/* <iframe ref={ node => this.contentIfr = node } src="/ueditor/index.html" frameBorder="none" width="100%" height="1000px" /> */}
    </div>
    ```
    ```js
        componentDidMount(){
        // const contentIfr = this.contentIfr
        //const record = this.state.record
        this._isMounted = true
        // if(record){
        //     contentIfr.onload =  function(){
        //         setTimeout(()=>{
        //             contentIfr.contentWindow.ue.setContent(record.content)
        //         }, 0)
        //     }
        // }
    }

    handleIframeLoad = ()=>{
        const record = this.state.record
        if(record){
            console.log('iframeLoad', document.getElementById('iframe'))
            setTimeout(()=>{
                if(!this._isMounted) return
                document.getElementById('iframe').contentWindow.ue.setContent(record.content)
            }, 0)
        }
    }

    componentWillUnmount(){
        this._isMounted = false
    }
    ```

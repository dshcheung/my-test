Forms should always have these 3 props
- optClass
- onSubmit
- submitInProgress

Forms render should always be follow
```
<div id="forms-xxx-xxx" className={optClass}>
  <form onSubmit={handleSubmit}>
    ...
  </form>
</div>
```
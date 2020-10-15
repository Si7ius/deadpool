  var q = {};

  function bindUsers(row) {
    fi.bind_users({ role_id: row.role_id });
  }

  function onCheck(checked){
    q.checked = {};
    q.checked.rows = _.filter(checked.rows(), x => !x.pcode);
    q.checked.size = q.checked.rows.length;
    q.checked.has = q.checked.size > 0;
  console.log('test');
  }

  
  if (){
    // if body
  }
  else {
    // smth ls
  }

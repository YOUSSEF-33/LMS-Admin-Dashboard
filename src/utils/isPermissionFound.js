
export const CheckPermission = (userPermission)=>{
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  //console.log(permissions);
  return permissions?.some(permission=> permission.name === userPermission);
}
function getUserId() {
    const user =JSON.parse(sessionStorage.getItem('user'));
    let id = user.id.toString();

    return id;
}
  
export { getUserId };
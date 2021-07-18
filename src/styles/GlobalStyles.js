import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*,
  *:after,
  *:before {
      margin: 0;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      font-family: "Poppins";
      color: rgb(41, 40, 40);
  }

.errors{
  color:red;
}

.logg, .search, .btn{
  background: ${({ theme }) => theme.colors.primary};
  color:white;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color:white;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    
}
}

button{
  width: 250px;
}

.logg{
  width: 100px;
  margin: 0px 20px;
}

.btn_post, .delete{
  background: ${({ theme }) => theme.colors.green};
  border: 1px solid ${({ theme }) => theme.colors.green};
  &:hover {
    background: ${({ theme }) => theme.colors.darkGreen};
    color:white;
    border: 1px solid ${({ theme }) => theme.colors.darkGreen};
    
}
}

.form{
  border: 1px solid ${({ theme }) => theme.colors.black};
}

.spinner{
  width: 40px;
  height: 40px;
  margin:40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:30px;
}

.container{
  background: ${({ theme }) => theme.colors.white};
}


.container_home{
  max-width: 600px;
  text-align: center;
  margin-top: 60px;
}

.container_home p{
  text-align: center;
  padding: 10px;
  font-size: 20px;
}


.container_form{
  max-width: 600px;
}

.select{
  width: 300px;
  padding:7px;
  margin: 10px 0px;
}

.control_content{
  padding: 20px;
}



.navbar{
  max-width: 1100px;
  margin: 0px auto;
  padding: 10px 15px;
  background: ${({ theme }) => theme.colors.black};
  border-bottom: 1px dashed white;
}
 
.navbar-collapse{
  border-top: 1px dashed white;
  text-align: center;
  font-size:18px;
  padding-top:10px;
}
.navbar-toggler{
  border: none;
}

.d-flex
{
  width: 80%;
  margin: 0px auto;
 
}

.mr-2{
  border: 1px solid ${({ theme }) => theme.colors.primary};
}

@media only screen and (min-width:993px) {
  .navbar-collapse{
   border-top:none;
}
}

.brand{
  font-size: 30px;
  letter-spacing: 2px;
}

.h2{
  font-size: 26px;
  font-weight: 500;
}

.moment{
  color: ${({ theme }) => theme.colors.primary};
}

.card_post{
  width: 350px;
  margin: 5px 10px;
  text-align:center;
}

.card_post_detail{
  max-width: 850px;
  margin: 5px auto;
  text-align:left;

}

.more-link{
  display: none;
}
@media screen and (min-width: 1000px) {
  .card_post{
    width: 450px;
  }
}
`

export default GlobalStyle;







import LoginPageComponent from "../../../components/customer/auth/LoginPage-component";
import Footer from "../../../components/customer/home/Footer"; 

function LoginPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <LoginPageComponent />
      <Footer />
    </div>
  );
}
export default LoginPage;

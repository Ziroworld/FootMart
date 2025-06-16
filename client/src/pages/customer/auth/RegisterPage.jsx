import RegisterPageComponent from "../../../components/customer/auth/RegisterPage-component";
import Footer from "../../../components/customer/home/Footer"; 

function RegisterPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <RegisterPageComponent />
      <Footer />
    </div>
  );
}
export default RegisterPage;

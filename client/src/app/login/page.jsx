import UserLogin from "@/components/auth/user";
import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <UserLogin />
    </div>
  );
}

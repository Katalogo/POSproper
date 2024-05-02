import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { Cart } from "./cart";
import { ICart } from "./icart";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-2 my-3 mx-2 pb-11">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      {/* <ProfileForm /> */}
      {/* <Cart /> */}
      <ICart />
    </div>
  );
}

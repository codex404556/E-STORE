import { Address } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { client } from "@/sanity/lib/client";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const DeleveryInfo = () => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.defaulte);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);
  return (
    <div>
      {addresses && (
        <div className="bg-white mt-5 rounded-md">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAddress?._id?.toString()}
                onValueChange={(value) => {
                  const addr = addresses?.find((a) => a._id === value);
                  if (addr) setSelectedAddress(addr);
                }}
              >
                {!loading ? (
                  <>
                    {addresses?.map((address) => (
                      <div
                        key={address._id}
                        className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                          selectedAddress?._id === address._id &&
                          "text-shop_dark_yellow"
                        }`}
                      >
                        <RadioGroupItem
                          id={`address-${address._id}`}
                          value={address._id.toString()}
                        />
                        <Label
                          htmlFor={`address-${address._id}`}
                          className="grid gap-1.5 flex-1"
                        >
                          <span className="font-semibold">{address.name}</span>
                          <span className="text-sm text-darkColor/50">
                            {address.address}, {address.city}, {address.state},{" "}
                            {address.zip}
                          </span>
                        </Label>
                      </div>
                    ))}{" "}
                  </>
                ) : (
                  <p className="text-lightColor font-semibold flex gap-2 items-center p-5 "><Loader2 className="w-5 h-5 text-shop_dark_yellow animate-spin" /><span>Loding Addresses...</span></p>
                )}
              </RadioGroup>
              <Button variant="link">Add new Address</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DeleveryInfo;

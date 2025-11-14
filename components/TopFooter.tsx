import { Clock, Mail, MapPin, Phone } from "lucide-react"
import React from "react"

interface ContactItemData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "visit our store",
    subtitle: "berlin, germany",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-color" />
    ),
  },
  {
    title: "call us",
    subtitle: "+49 123 456 7890",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-color" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "e-store@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const TopFooter = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-t border-gray-100 bg-white group mb-10">
      {data?.map((item, index) => (
        <div key={index} className="flex items-center gap-3 group hover:bg-gray-50 hoverEffect transition-colors">
            {item?.icon}
            <div className="">
                <h3 className="font-semibold text-gray-700 group-hover:text-black hoverEffect">{item?.title}</h3>
                <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 hoverEffect">{item?.subtitle}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

export default TopFooter

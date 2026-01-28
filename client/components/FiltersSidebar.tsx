import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Calendar from "./Calendar";

export default function FiltersSidebar() {
  const [boatLength, setBoatLength] = useState([18, 26]);

  return (
    <aside className="w-full lg:w-[365px] bg-white rounded-md p-5 lg:p-7 flex flex-col gap-4 h-fit lg:sticky lg:top-5">
      <Calendar />

      {/* Location */}
      <div className="pt-4 border-t border-gray-500/25">
        <h3 className="text-gray-900 font-semibold text-base mb-3">Location</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="all-locations"
              defaultChecked
              className="w-[18px] h-[18px] rounded border-gray-500/25 data-[state=checked]:bg-blue-primary data-[state=checked]:border-blue-primary"
            />
            <label
              htmlFor="all-locations"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              All Locations
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="phillippi"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="phillippi"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Phillippi Harbor Club
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="sarasota"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="sarasota"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Sarasota Bay
            </label>
          </div>
        </div>
      </div>

      {/* Boat Type */}
      <div className="pt-4 border-t border-gray-500/25">
        <h3 className="text-gray-900 font-semibold text-base mb-3">
          Boat Type
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="all-boat-types"
              defaultChecked
              className="w-[18px] h-[18px] rounded border-gray-500/25 data-[state=checked]:bg-blue-primary data-[state=checked]:border-blue-primary"
            />
            <label
              htmlFor="all-boat-types"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              All Boat Types
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="deck-boat"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="deck-boat"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Deck Boat
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="bowrider"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="bowrider"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Bowrider
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="center-console"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="center-console"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Center Console
            </label>
          </div>
        </div>
      </div>

      {/* Boat Length */}
      <div className="pt-4 border-t border-gray-500/25">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-semibold text-base">Boat Length</h3>
          <span className="text-gray-900 text-sm">16' - 30'</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-blue-primary">
            <span>Min</span>
            <span className="ml-auto">{boatLength[0]}'</span>
          </div>
          <Slider
            value={boatLength}
            onValueChange={setBoatLength}
            min={16}
            max={30}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-blue-primary">
            <span>Max</span>
            <span className="ml-auto">{boatLength[1]}'</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="pt-4 border-t border-gray-500/25">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-semibold text-base">Features</h3>
          <button className="text-blue-primary text-sm font-medium hover:underline">
            Reset
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="fishing-permitted"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="fishing-permitted"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Fishing Permitted
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="livewell"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="livewell"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Livewell
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="offshore-use"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="offshore-use"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Offshore Use
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="watersports"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="watersports"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Watersports
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="bimini"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="bimini"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Bimini
            </label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="pets-allowed"
              className="w-[18px] h-[18px] rounded border-gray-500/25"
            />
            <label
              htmlFor="pets-allowed"
              className="text-gray-900 text-sm font-medium cursor-pointer"
            >
              Pets Allowed
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}

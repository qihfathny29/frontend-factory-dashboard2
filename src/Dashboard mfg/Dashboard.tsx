
// Update DummyCard biar bisa terima prop 'heightClass'
const DummyCard = ({
  title,
  color = "bg-white",
  heightClass = "min-h-[150px]", // Default kalau tidak diisi
}: {
  title: string;
  color?: string;
  heightClass?: string;
}) => (
  <div
    // Gabungkan heightClass ke dalam className
    className={`${color} ${heightClass} rounded-lg shadow-md p-4 h-full flex flex-col justify-center items-center border border-gray-200`}
  >
    <h3 className="font-bold text-gray-700 text-lg text-center">{title}</h3>
    <p className="text-sm text-gray-500 mt-2">Content Placeholder</p>
  </div>
);

const MfgDashboard = () => {
  return (
    <div className="p-4 bg-[#EEE9E5] min-h-screen flex flex-col gap-4 overflow-y-auto">
      {/* === ROW 1 (Charts) === */}
      {/* Kita kasih tinggi min-h-[300px] biar muat chart */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <DummyCard title="Operating Rate" heightClass="min-h-[300px]" />
        </div>
        <div className="col-span-2">
          <DummyCard title="Loss Time Breakdown" heightClass="min-h-[300px]" />
        </div>
        <div className="col-span-1">
          <DummyCard title="NG Ratio" heightClass="min-h-[300px]" />
        </div>
        <div className="col-span-2">
          <DummyCard title="NG Ratio by Product" heightClass="min-h-[300px]" />
        </div>
      </div>

      {/* === ROW 2 (Key Metrics / Angka Besar) === */}
      {/* Kita kasih tinggi min-h-[180px] cukup untuk angka */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <DummyCard title="Production Qty" heightClass="min-h-[180px]" />
        </div>
        <div className="col-span-1">
          <DummyCard title="Manpower" heightClass="min-h-[180px]" />
        </div>
        <div className="col-span-1">
          <DummyCard title="Overtime" heightClass="min-h-[180px]" />
        </div>
        <div className="col-span-1">
          <DummyCard title="Loss Time" heightClass="min-h-[180px]" />
        </div>
        <div className="col-span-1">
          <DummyCard title="NG Scrap Ratio" heightClass="min-h-[180px]" />
        </div>
        <div className="col-span-1">
          <DummyCard title="NG Rework Ratio" heightClass="min-h-[180px]" />
        </div>
      </div>

      {/* === ROW 3 (Tables & Charts) === */}
      {/* Kita kasih tinggi min-h-[300px] lagi biar muat tabel */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <DummyCard
            title="O/R Issue Kaizen Plan"
            heightClass="min-h-[300px]"
          />
        </div>
        <div className="col-span-1">
          <DummyCard
            title="O/R Issue KPS Progress"
            heightClass="min-h-[300px]"
          />
        </div>
        <div className="col-span-2">
          <DummyCard title="NG Issue Kaizen Plan" heightClass="min-h-[300px]" />
        </div>
        <div className="col-span-1">
          <DummyCard
            title="NG Issue KPS Progress"
            heightClass="min-h-[300px]"
          />
        </div>
      </div>

      {/* === ROW 3 (4 Card) === */}
      {/* Layout: 2 unit, 1 unit, 2 unit, 1 unit */}
      <div className="grid grid-cols-6 gap-4">
        {/* Card 1 (Lebar 2 kolom) */}
        <div className="col-span-2">
          <DummyCard title="Row 3 - Card 1" />
        </div>

        {/* Card 2 (Lebar 1 kolom) */}
        <div className="col-span-1">
          <DummyCard title="Row 3 - Card 2" />
        </div>

        {/* Card 3 (Lebar 2 kolom) */}
        <div className="col-span-2">
          <DummyCard title="Row 3 - Card 3" />
        </div>

        {/* Card 4 (Lebar 1 kolom) */}
        <div className="col-span-1">
          <DummyCard title="Row 3 - Card 4" />
        </div>
      </div>
    </div>
  );
};

export default MfgDashboard;

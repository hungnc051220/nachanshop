export const categories = [
  {
    name: "Chăm sóc sắc đẹp",
    route: "cham-soc-sac-dep",
    subCategories: [
      {
        name: "Chăm sóc da",
        route: "cham-soc-da",
        subCategories: [
          { name: "Kem dưỡng da", href: "kem-duong" },
          { name: "Rửa mặt", href: "rua-mat" },
          { name: "Mặt nạ dưỡng mặt", href: "mat-na-duong-da" },
          { name: "Nước hoa hồng", href: "nuoc-hoa-hong" },
          { name: "Tẩy da chết", href: "tay-da-chet" },
          { name: "Tẩy trang", href: "tay-trang" },
          { name: "Tinh chất dưỡng da", href: "tinh-chat-duong-da" },
          { name: "Phụ kiện chăm sóc da", href: "phu-kien-cham-soc-da" },
        ],
      },
      {
        name: "Chăm sóc tóc",
        route: "cham-soc-toc",
        subCategories: [
          { name: "Dưỡng tóc", href: "duong-toc" },
          { name: "Dầu gội, dầu xả", href: "dau-goi-dau-xa" },
          { name: "Nhuộm tóc", href: "nhuom-toc" },
          { name: "Dụng cụ chăm sóc tóc", href: "dung-cu-cham-soc-toc" },
        ],
      },
      {
        name: "Chăm sóc cơ thể",
        route: "cham-soc-co-the",
        subCategories: [
          { name: "Chống nắng", href: "chong-nang" },
          { name: "Dưỡng môi", href: "duong-moi" },
          { name: "Dưỡng thể", href: "duong-the" },
          { name: "Khử mùi mồ hôi", href: "khu-mui-mo-hoi" },
          { name: "Sữa tắm", href: "sua-tam" },
          { name: "Tẩy lông", href: "tay-long" },
          { name: "Dao cạo, bấm móng", href: "dao-cao-bam-mong" },
        ],
      },
      {
        name: "Thực phẩm làm đẹp",
        route: "thuc-pham-lam-dep",
        subCategories: [
          { name: "Chống lão hoá", href: "chong-lao-hoa" },
          { name: "Collagen", href: "collagen" },
          { name: "Làm đẹp da", href: "lam-dep-da" },
          { name: "Giảm cân", href: "giam-can" },
        ],
      },
      {
        name: "Trang điểm",
        route: "trang-diem",
        subCategories: [
          { name: "Kem nền", href: "kem-nen" },
          { name: "Phấn", href: "phan" },
          { name: "Son môi", href: "son-moi" },
          { name: "Trang điểm mắt", href: "trang-diem-mat" },
          { name: "Dụng cụ trang điểm", href: "dung-cu-trang-diem" },
        ],
      },
    ],
  },
  {
    name: "Chăm sóc sức khoẻ",
    route: "cham-soc-suc-khoe",
    subCategories: [
      {
        name: "Thực phẩm chức năng",
        route: "thuc-pham-chuc-nang",
        subCategories: [
          { name: "Bổ sung canxi", href: "bo-sung-canxi" },
          { name: "Bổ sung DHA", href: "bo-sung-dha" },
          { name: "Bổ sung Glocosamin", href: "bo-sung-glucosamin" },
          { name: "Bổ sung Vitamin", href: "bo-sung-vitamin" },
          { name: "Ổn định huyết áp", href: "on-dinh-huyet-ap" },
          { name: "Tảo", href: "tao" },
          { name: "Chống lão hóa", href: "chong-lao-hoa" },
          { name: "Collagen", href: "collagen" },
          { name: "Làm đẹp da", href: "lam-dep-da" },
          { name: "Giảm cân", href: "giam-can" },
        ],
      },
      {
        name: "Chăm sóc răng miệng",
        route: "cham-soc-rang-mieng",
        subCategories: [
          { name: "Bàn chải đánh răng", href: "ban-chai-danh-rang" },
          { name: "Kem đánh răng", href: "kem-danh-rang" },
          { name: "Khử mùi răng miệng", href: "khu-mui-rang-mieng" },
          { name: "Vật dụng nha khoa", href: "vat-dung-nha-khoa" },
        ],
      },
      {
        name: "Chăm sóc tai, mắt, mũi",
        route: "cham-soc-tai-mat-mui",
        subCategories: [
          { name: "Chăm sóc tai", href: "cham-soc-tai" },
          { name: "Chăm sóc mắt", href: "cham-soc-mat" },
          { name: "Chăm sóc mũi", href: "cham-soc-mui" },
        ],
      },
    ],
  },
  {
    name: "Mẹ và Bé",
    route: "me-va-be",
    subCategories: [
      {
        name: "Thực phẩm cho bé",
        route: "thuc-pham-cho-be",
        subCategories: [
          { name: "Bánh ăn dặm", href: "banh-an-dam" },
          { name: "Bột ăn dặm", href: "bot-an-dam" },
          { name: "Cháo soup ăn dặm", href: "chao-soup-an-dam" },
          { name: "Cơm trộn", href: "com-tron" },
          { name: "Mỳ ăn dặm", href: "my-an-dam" },
          { name: "Nước ép cho bé", href: "nuoc-ep-cho-be" },
          { name: "Sốt ăn dặm", href: "sot-an-dam" },
          { name: "Thạch bổ sung vitamin", href: "thach-bo-sung-vitamin" },
          { name: "Trà lúa mạch", href: "tra-lua-mach" },
        ],
      },
      {
        name: "Chăm sóc cơ thể bé",
        route: "cham-soc-co-the-be",
        subCategories: [
          { name: "Chống muỗi, chống côn trùng", href: "chong-muoi-chong-con-trung" },
          { name: "Chống nắng cho bé", href: "chong-nang-cho-be" },
          { name: "Hạ sốt, trị ho, sổ mũi", href: "ha-sot-tri-ho-so-mui" },
          { name: "Kem dưỡng massage cho bé", href: "kem-duong-massage-cho-be" },
          { name: "Bịt ổ điện, chặn cửa", href: "bit-o-dien-chan-cua" },
        ],
      },
      {
        name: "Dành cho mẹ bầu",
        route: "danh-cho-me-bau",
        subCategories: [
          { name: "Thực phẩm chức năng", href: "thuc-pham-chuc-nang" },
          { name: "Sữa bầu", href: "sua-bau" },
          { name: "Thấm sữa", href: "tham-sua" },
        ],
      },
    ],
  },
  {
    name: "Thực phẩm",
    route: "thuc-pham",
    subCategories: [
      {
        name: "Đồ uống, pha chế",
        route: "do-uong-pha-che",
        subCategories: [
          { name: "Đồ uống có ga", href: "do-uong-co-ga" },
          { name: "Nguyên liệu pha chế", href: "nguyen-lieu-pha-che" },
          { name: "Nước hoa quả", href: "nuoc-hoa-qua" },
          { name: "Thức uống từ sữa", href: "thuc-uong-tu-sua" },
          { name: "Trà gói, hộp", href: "tra-goi-hop" },
          { name: "Trà, cà phê đóng sẵn", href: "tra-ca-phe-dong-san" },
        ],
      },
      {
        name: "Bánh kẹo, đồ ăn vặt",
        route: "banh-keo-do-an",
        subCategories: [
          { name: "Bánh", href: "banh" },
          { name: "Bánh kẹo cho trẻ em", href: "banh-keo-cho-tre-em" },
          { name: "Hoa quả hạt khô", href: "hoa-qua-hat-kho" },
          { name: "Ngũ cốc", href: "ngu-coc" },
          { name: "Thạch", href: "thach" },
        ],
      },
    ],
  },
];
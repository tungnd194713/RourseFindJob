<template>
    <main class="container-maintain"
          :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }"
    >
        <div class="container">
            <div class="inner-container">
                <div class="container tab-container">
                    <div v-if="$i18n.locale === 'vi'" class="row">
                        <h3 class="title-page text-center fw-bold">Về việc xử lý thông tin cá nhân</h3>
                    </div>
                    <div v-else class="row">
                        <h3 class="title-page text-center fw-bold">個人情報の取り扱いについて</h3>
                    </div>
                </div>

                <div v-if="$i18n.locale === 'vi'" class="row m-4">
                    <div class="card card-content-one mb-2">
                        <h4 class="title-page-second font-weight-normal text-end">
                            <span class="d-block header mb-0">"Công ty cổ phần bring</span>
                            <span class="d-block header mb-0">Giám đốc đại diện Shinozaki Hiroyuki"</span>
                        </h4>
                    </div>
                    <div class="card card-content-one">
                        <div class="header text-indent">
                            Công ty chúng tôi đặc biệt lưu ý trong việc quản lý thông tin cá nhân của người dùng shuu Navi (sau đây gọi là "dịch vụ này") và xử lý những thông tin đó theo như dưới đây:
                        </div>
                    </div>
                    <div class="card card-content-one">
                        <h2 class="title-page-second fw-bold">
                            1. Về định nghĩa các thuật ngữ
                        </h2>
                        <div class="header text-indent">
                            Định nghĩa về các thuật ngữ như thông tin cá nhân sẽ tuân theo các quy định của "Luật về bảo vệ thông tin cá nhân (Luật số 57 năm 2003)".
                        </div>
                    </div>

                    <div class="card card-content-two">
                        <h2 class="title-page-second fw-bold">
                            2. Về mục đích sử dụng thông tin cá nhân
                        </h2>
                        <div class="header text-indent mb-0">Công ty chúng tôi thu thập thông tin cá nhân của người sử dụng dịch vụ cho các mục đích sau:</div>
                        <div class="content">
                            <ul class="p-0 mb-0">
                                <li class="text-indent">
                                    (1) Sử dụng thông tin được nhập trong form đăng ký thành viên để cung cấp cho việc đăng ký thành viên, quản lý, liên lạc công việc và cho các chức năng hệ thống khác nhau trong dịch vụ của công ty chúng tôi.
                                </li>
                                <li class="text-indent">
                                    (2) Cung cấp thông tin mà người dùng nhập khi đăng ký thành viên cho các doanh nghiệp hoặc nhà kinh doanh trong và ngoài nước liên kết với công ty chúng tôi.
                                </li>
                                <li class="text-indent">
                                    (3) Cải thiện dịch vụ hiện có của công ty chúng tôi và phát triển các dịch vụ mới.
                                </li>
                                <li class="text-indent">
                                    (4) Dùng cho việc quảng cáo, quảng bá các sản phẩm, thu hút hoạt động bán hàng, truyền thông của bên thứ ba.
                                </li>
                                <li class="text-indent">
                                    (5) Tạo phiếu điều tra, yêu cầu trong các chiến dịch khuyến mại, liên lạc, gửi tặng quà, v.v.
                                </li>
                                <li class="text-indent">
                                    (6) Truyền phát các thông tin như mail magazine, v.v.
                                </li>
                                <li class="text-indent">
                                    (7) Trả lời các câu hỏi, thắc mắc từ người dùng.
                                </li>
                                <li class="text-indent">
                                    (8) Thực hiện công việc bảo trì, bảo dưỡng các dịch vụ do công ty chúng tôi cung cấp.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            3. Về việc tự nguyện cung cấp thông tin cá nhân
                        </h2>
                        <div class="header text-indent">
                            Việc cung cấp thông tin cá nhân cho công ty chúng tôi hoàn toàn dựa trên nguyên tắc tự nguyện của cá nhân. Tuy nhiên xin lưu ý rằng có trường hợp không thể đăng ký thành viên hoặc không thể sử dụng hệ thống, dịch vụ của công ty chúng tôi nếu không cung cấp đầy đủ các thông tin cần thiết.
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            4. Về việc cung cấp thông tin cá nhân
                        </h2>
                        <div class="header text-indent mb-0">
                            Công ty chúng tôi sẽ cung cấp thông tin cá nhân cho bên thứ ba trong các trường hợp dưới đây.
                        </div>
                        <div class="header text-indent mb-0">
                            Ngoài ra, chúng tôi cũng có thể cung cấp thông tin cá nhân cho bên thứ ba nếu có sự chấp thuận của cá nhân đối với những trường hợp không được ghi bên dưới.
                        </div>
                        <div class="header text-indent mb-0">
                            Việc cung cấp thông tin cá nhân, chúng tôi sẽ tiến hành bằng hệ thống web được mã hóa, e-mail hoặc văn bản giấy trừ khi có quy định khác.
                        </div>
                        <div class="content">
                            <ul class="p-0 mb-0">
                                <li class="text-indent">
                                    (1) Để cung cấp dịch vụ, công ty chúng tôi có thể chia sẻ thông tin do cá nhân nhập khi đăng ký thành viên cho các doanh nghiệp, nhà kinh doanh trong và ngoài nước đã liên kết.
                                </li>
                                <li class="text-indent">
                                    (2) Công ty chúng tôi có thể cung cấp thông tin cá nhân cho bên thứ ba là nước ngoài để đạt được mục đích được mô tả ở mục "2. Về mục đích sử dụng thông tin cá nhân".
                                </li>
                                <li class="text-indent">
                                    (3) Về nguyên tắc, công ty chúng tôi sẽ không cung cấp thông tin cá nhân cho bên thứ ba nếu không có sự đồng ý của người dùng. Tuy nhiên, thông tin cá nhân có thể được cung cấp cho bên thứ ba mà không cần sự đồng ý của cá nhân người dùng trong những trường hợp sau:
                                    <ul class="ul-level-three">
                                        <li class="text-indent">1. Theo quy định của pháp luật.</li>
                                        <li class="text-indent">2. Khi cần thiết để bảo vệ tính mạng, thân thể hoặc tài sản của con người và khó nhận được sự đồng ý của cá nhân.</li>
                                        <li class="text-indent">3. Khi đặc biệt cần cho việc cải thiện sức khỏe cộng đồng hoặc thúc đẩy sự phát triển toàn diện của trẻ em và khó nhận được sự đồng ý của cá nhân.</li>
                                        <li class="text-indent">4. Khi cần hợp tác với nhà nước hoặc cơ quan địa phương hay người được ủy thác để thực hiện các công việc do luật pháp quy định nhưng có rủi ro không thể hoàn thành công việc đó do cần nhận được sự đồng ý của cá nhân.</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            5. Về điều khoản miễn trách nhiệm liên quan đến việc cung cấp cho bên thứ ba
                        </h2>
                        <div class="header text-indent mb-0">
                            Công ty chúng tôi sẽ không chịu bất kỳ trách nhiệm nào đối với việc thu thập thông tin cá nhân của bên thứ ba trong những trường hợp sau đây:
                        </div>
                        <div class="content">
                            <ul class="p-0 mb-0">
                                <li class="text-indent">
                                    (1) Người dùng sử dụng chức năng của dịch vụ này hoặc các phương thức khác, tự tiết lộ thông tin cá nhân cho bên thứ ba như các nhà kinh doanh hoặc công ty tuyển dụng.
                                </li>
                                <li class="text-indent">
                                    (2) Cá nhân người dùng được bên thứ ba xác định bằng thông tin hoạt động của người dùng hoặc thông tin do người dùng đăng tải liên quan đến việc sử dụng dịch vụ này.
                                </li>
                                <li class="text-indent">
                                    (3) Thông tin cá nhân được người dùng cung cấp và sử dụng trên trang web bên ngoài được liên kết từ dịch vụ này.
                                </li>
                                <li class="text-indent">
                                    (4) Những thông tin có thể xác định người dùng (như ID, mật khẩu) bị ai đó không phải cá nhân người dùng lấy được.
                                </li>
                                <li class="text-indent">
                                    (5) Khi trách nhiệm không thuộc về công ty chúng tôi.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            6. Về việc ủy thác thông tin cá nhân
                        </h2>
                        <div class="header text-indent">
                            Công ty chúng tôi có thể ủy thác cho bên nhận ủy thác xử lý thông tin cá nhân trong hoạt động kinh doanh. Trong trường hợp này, chúng tôi sẽ lựa chọn cẩn thận bên nhận ủy thác với điều kiện bên đó phải thiết lập và đang triển khai hệ thống quản lý để đảm bảo thông tin cá nhân được bảo vệ một cách thích hợp. Sau đó, chúng tôi sẽ quyết định các nội dung cần thiết để ngăn chặn rò rỉ thông tin cá nhân của người dùng bằng cách quản lý phù hợp, bảo mật thông tin cá nhân trong hợp đồng và yêu cầu bên nhận ủy thác thực hiện quản lý thích hợp.
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            7. Về việc lưu trữ bản ghi âm cuộc gọi
                        </h2>
                        <div class="header text-indent">
                            Công ty chúng tôi có thể lưu bản ghi âm cuộc gọi qua điện thoại nhằm mục đích xác nhận nội dung cuộc gọi và nâng cao chất lượng dịch vụ.
                        </div>
                    </div>
                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            8. Về việc sử dụng dữ liệu được xử lý thống kê
                        </h2>
                        <div class="header text-indent">
                            Dựa trên thông tin cá nhân thu thập được, công ty chúng tôi có thể tạo thông tin thống kê trừ thư từ trao đổi với các cá nhân và có quyền sử dụng thông tin thống kê này mà không có bất kỳ hạn chế nào.
                        </div>
                    </div>
                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            9. Về việc quản lý an toàn
                        </h2>
                        <div class="content">
                            <ul class="p-0 mb-0">
                                <li class="text-indent">(1) Các biện pháp quản lý an toàn của tổ chức</li>
                                <ul class="ul-level-three">
                                    <li class="text-indent">1. Chúng tôi đã bố trí người phụ trách xử lý dữ liệu cá nhân và đã thiết lập một đầu mối liên hệ để báo cáo các sự cố.</li>
                                    <li class="text-indent">2. Chúng tôi đang thực hiện các giám sát nội bộ liên quan đến việc kiểm kê và xử lý dữ liệu cá nhân.</li>
                                </ul>
                                <li class="text-indent">(2) Các biện pháp quản lý an toàn về mặt con người</li>
                                <ul class="ul-level-three">
                                    <li class="text-indent">3. Chúng tôi đang thực hiện các buổi đào tạo về xử lý dữ liệu cá nhân cho tất cả nhân viên.</li>
                                    <li class="text-indent">4. Chúng tôi đang trao đổi biên bản ghi nhớ về việc xử lý dữ liệu cá nhân với tất cả nhân viên.</li>
                                </ul>
                                <li class="text-indent">(3) Các biện pháp quản lý an toàn về mặt vật chất</li>
                                <ul class="ul-level-three">
                                    <li class="text-indent">5. Chúng tôi đang thực hiện bảo vệ chống trộm và mã hóa các thiết bị và phương tiện điện tử xử lý dữ liệu cá nhân.</li>
                                    <li class="text-indent">6. Văn phòng xử lý dữ liệu cá nhân cũng đang được hạn chế ra vào.</li>
                                </ul>
                                <li class="text-indent">(4) Các biện pháp quản lý an toàn về mặt kỹ thuật</li>
                                <ul class="ul-level-three">
                                    <li class="text-indent">7. Chúng tôi đang triển khai kiểm soát truy cập đối với dữ liệu cá nhân và thiết lập hệ thống trong đó chỉ những nhân viên cần thiết tối thiểu mới có thể truy cập vào dữ liệu cá nhân.</li>
                                    <li class="text-indent">8. Chúng tôi đang áp dụng cơ chế bảo vệ các hệ thống thông tin xử lý dữ liệu cá nhân để tránh truy cập trái phép.</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            Về việc xác nhận danh tính cá nhân
                        </h2>
                        <div class="header text-indent">
                            Công ty chúng tôi xác nhận danh tính cá nhân bằng các thông tin có thể nhận dạng cá nhân (như tên, số điện thoại, địa chỉ email, password) khi người dùng đăng ký thành viên, sử dụng dịch vụ hoặc khi đáp ứng yêu cầu tiết lộ, chỉnh sửa, xóa hoặc tạm ngừng sử dụng thông tin cá nhân. Tuy nhiên, chúng tôi không chịu bất kỳ trách nhiệm nào về việc thông tin nhận dạng cá nhân bị ai đó không phải cá nhân lấy được và sử dụng.
                        </div>
                    </div>
                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            Về thủ tục thực hiện các yêu cầu tiết lộ, sửa, tạm ngừng sử dụng thông tin cá nhân
                        </h2>
                        <div class="header text-indent">
                            Đối với các yêu cầu của người dùng về thông báo mục đích sử dụng, tiết lộ, sửa, thêm hoặc xóa nội dung, tạm ngừng sử dụng, xóa và ngừng cung cấp cho bên thứ ba (sau đây gọi là "tiết lộ thông tin"), công ty chúng tôi sẽ nhanh chóng đáp ứng về các thông tin cá nhân mà chúng tôi nắm giữ trong phạm vi hợp lý sau khi xác nhận danh tính của người dùng. Tuy nhiên, điều này không áp dụng trong các trường hợp như có nguy cơ xâm hại đến tính mạng, thân thể, tài sản hoặc lợi ích khác của người dùng khác hoặc bên thứ ba khác, trường hợp xác định được điều đó sẽ cản trở đáng kể đến hoạt động kinh doanh của công ty chúng tôi, hoặc vi phạm pháp luật trong việc phản hồi. Về thủ tục chi tiết liên quan đến việc yêu cầu tiết lộ thông tin, vui lòng liên hệ theo thông tin dưới văn bản này.
                        </div>
                    </div>
                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            Về việc thay đổi nội dung của văn bản "Về việc xử lý thông tin cá nhân"
                        </h2>
                        <div class="header text-indent">
                            Công ty chúng tôi có thể tự thay đổi nội dung của văn bản "Về việc xử lý thông tin cá nhân" trong khuôn khổ pháp luật.
                        </div>
                    </div>
                    <div class="card card-content-three">
                        <h2 class="title-page-second fw-bold">
                            Người quản lý bảo vệ thông tin cá nhân và thông tin liên hệ
                        </h2>
                        <div class="header text-indent mb-0">
                            Công ty chúng tôi chỉ định người sau đây làm người quản lý bảo vệ thông tin cá nhân với nhiệm vụ quản lý thông tin cá nhân của người dùng một cách thích hợp và an toàn, đồng thời ngăn chặn và khắc phục mất mát, phá hoại, giả mạo, rò rỉ thông tin và truy cập trái phép từ bên ngoài.
                        </div>
                        <div class="header">
                            Người quản lý bảo vệ thông tin cá nhân công ty cổ phần bring : Takao Fujii
                        </div>
                    </div>

                    <div class="card card-content-eight">
                        <div class="content">
                            Nếu Quý khách có những thắc mắc liên quan, xin vui lòng liên hệ với chúng tôi theo địa chỉ sau:
                        </div>
                    </div>
                    <div class="card card-content-nine">
                        <div class="content">
                            <p class="mb-0 font-vi"
                            >Công ty cổ phần bring</p>
                            <p class="mb-0 font-vi">Địa chỉ: 〒300-1206 Wise Court 203, 3-31-10 Hitachinonishi, thành phố Ushiku, Tỉnh Ibaraki, Japan.</p>
                            <p class="mb-0 font-vi">ĐT: 029-869-5900</p>
                        </div>
                    </div>
                </div>

                <div v-else class="row m-4">
                    <div class="card card-content-one mb-2">
                        <h2 class="title-page-second text-end">
                            <span class="d-block header mb-0">株式会社 bring</span>
                            <span class="d-block header mb-0">代表取締役社 篠﨑 紘幸</span>
                        </h2>
                    </div>
                    <div class="card card-content-one p-0">
                        <div class="header">
                            当社はshuuナビ（以下「本サービス」といいます）の利用者の個人情報を管理するにあたっては細心の注意を払い、以下に掲げたとおりに取り扱います。
                        </div>
                    </div>
                        <div class="p-0 card card-content-one">
                            <h2 class="title-page-second fw-bold">
                                1. 用語の定義について
                            </h2>
                            <div class="header content-item">
                                個人情報等の定義は「個人情報の保護に関する法律（平成15年法律第57号）」の定めるところに従うものとします。
                            </div>
                        </div>

                        <div class="p-0 card card-content-two">
                            <h2 class="title-page-second fw-bold">
                                2. 個人情報の利用目的について
                            </h2>
                            <div class="header content-item">
                                当社は、サービスご利用者の個人情報を以下に掲げる利用目的のために収集します。
                                <div class="content mb-0">
                                    <ul class="pl-2 mb-0">
                                        <li>(1) 会員登録フォームに入力いただいた情報を、当社サービスの会員登録、管理、事務連絡および各種システム機能のご提供に使用するため

                                        </li>
                                        <li>
                                            (2) 会員登録時に入力いただいた情報を、当社と提携した国内および国外の事業者または企業に情報を提供するため
                                        </li>
                                        <li>
                                            (3) 当社サービスの改善および新サービスの開発のため
                                        </li>
                                        <li>
                                            (4) 第三者の商品等の広告・宣伝、販売の勧誘・広報活動のため
                                        </li>
                                        <li>
                                            (5) アンケート、キャンペーン等の依頼、連絡、プレゼント発送等を行うため
                                        </li>
                                        <li>
                                            (6) メールマガジン等の情報を配信するため
                                        </li>
                                        <li>
                                            (7) 利用者からの問い合わせ、質問に対する回答を行うため
                                        </li>
                                        <li>
                                            (8) 当社が提供するサービスの保守・メンテナンス業務を行うため
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                3. 個人情報提供の任意性について
                            </h2>
                            <div class="header content-item">
                                個人情報の当社への提供は、ご本人の同意に基づく任意ですが、必要な情報が提供されない場合、会員登録および当社サービス・システムの利用ができない場合もありうることをご了承ください。
                            </div>
                        </div>

                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                4. 個人情報の提供について
                            </h2>
                            <div class="header content-item">
                                <p class="mb-0 font-ja">当社は下記の場合に個人情報を第三者に提供いたします。</p>
                                <p class="mb-0 font-ja">なお、下記に記載がない場合もご本人の同意を得た上で個人情報を第三者に提供することがあります。</p>
                                <p class="mb-0 font-ja">個人情報の提供は、特に記述のない限り、暗号化等を施したウェブシステム、電子メール、書面の手交のいずれかによるものとします。</p>

                                <div class="content mb-0">
                                    <ul class="pl-2 mb-0">
                                        <li>
                                            (1) サービス提供のため、会員登録時に入力いただいた情報を、提携した国内および国外の事業者または企業に提供する場合があります。
                                        </li>
                                        <li>
                                            (2) 当社は「2.個人情報の利用目的について」で述べた目的を達成するため、個人情報を外国の第三者に提供する可能性があります。
                                        </li>
                                        <li>
                                            (3) 当社は、原則として、利用者の同意のない限り、第三者に個人情報を提供することはありません。ただし、以下の場合には、利用者の同意なく個人情報を提供することがあります。
                                            <ul>
                                                <li>1. 法令に基づく場合</li>
                                                <li>2. 人の生命、身体又は財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                                <li>3. 公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                                <li>4. 国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることによって当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                5. 第三者提供に関する免責事項について
                            </h2>
                            <div class="header content-item">
                                以下の場合は、第三者による個人情報の取得に関し、当社は何らの責任を負いません。
                                <ul class="pl-2 mb-0">
                                    <li>
                                        (1) 利用者自らが本サービスの機能または別の手段を用いて事業者、求人企業等の第三者に個人情報を明らかにする場合
                                    </li>
                                    <li>
                                        (2) 利用者の活動情報または利用者が本サービスの利用に関して投稿等した情報により、第三者に利用者本人が特定されるにいたった場合
                                    </li>
                                    <li>
                                        (3) 本サービスからリンクされる外部サイトにおいて、利用者より個人情報が提供され、またそれが利用された場合
                                    <li>
                                        (4) 利用者本人以外が利用者個人を識別できる情報（ID、パスワード等）を入手した場合
                                    </li>
                                    <li>
                                        (5) 当社に責めに帰すべき事由がない場合
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                6. 個人情報の委託について
                            </h2>
                            <div class="header content-item">
                                当社は事業運営上、業務委託先に個人情報の取り扱いを委託することがあります。この場合、当社は、個人情報を適切に保護できる管理体制を敷き実行していることを条件として委託先を厳選したうえで、契約等において個人情報の適正管理・機密保持などにより利用者の個人情報の漏洩防止に必要な事項を取決め、適切な管理を実施させます。
                            </div>
                        </div>

                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                7. 通話記録の保存について
                            </h2>
                            <div class="header content-item">
                                当社は、通話内容の確認、サービス品質の向上を目的として電話等による通話記録を保存させていただく場合があります。
                            </div>
                        </div>
                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                8. 統計処理されたデータの利用について
                            </h2>
                            <div class="header content-item">
                                当社は、取得した個人情報をもとに、個人との対応関係を排斥した統計情報を作成することがあります。統計情報については、当社は何ら制限なく利用することができるものとします。
                            </div>
                        </div>
                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                9. 安全管理について
                            </h2>
                            <div class="content">
                                <ul class="mb-0">
                                    <li>(1) 組織的安全管理措置</li>
                                    <ul>
                                        <li>1. 個人データの取り扱いに関する責任者を設置し、事故等の報告窓口を整備しています。</li>
                                        <li>2. 個人データの棚卸しや個人データの取り扱いに関する内部監査を実施しています。</li>
                                    </ul>
                                    <li>(2) 人的安全管理措置</li>
                                    <ul>
                                        <li>3. 全従業員向けに個人データの取り扱いに関する研修を実施しています。</li>
                                        <li>4. 全従業員と個人データの取り扱いに関する覚書を交わしています。</li>
                                    </ul>
                                    <li>(3) 物理的安全管理措置</li>
                                    <ul>
                                        <li>5. 個人データを扱う機器、電子媒体は盗難防止策および暗号化を実施しています。</li>
                                        <li>6. 個人データを取り扱う執務室は入退出制限を実施しています。</li>
                                    </ul>
                                    <li>(4) 技術的安全管理措置</li>
                                    <ul>
                                        <li>7. 個人データのアクセス制御を実施し、必要最小限の担当者のみが個人データにアクセスする体制を整備しています。</li>
                                        <li>8. 個人データを取り扱う情報システムを不正アクセスなどから保護する仕組みを導入しています。</li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                本人確認について
                            </h2>
                            <div class="header content-item">
                                当社は、利用者の会員登録の場合や会員がサービスを利用する場合、個人情報の開示、訂正、削除もしくは利用停止の求めに応じる場合など、個人を識別できる情報（氏名、電話番号、メールアドレス、パスワード等）により、本人であることを確認します。ただし、本人以外が個人を識別できる情報を入手し使用した場合、当社は責任を負いません。
                            </div>
                        </div>
                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                            	開示、訂正、利用停止等の求めに応じる手続について
                            </h2>
                            <div class="header content-item">
                                利用者からの個人情報の利用目的の通知、開示、内容の訂正、追加又は削除、利用の停止、消去および第三者への提供の停止（以下「開示等」といいます。）の求めにつき、当社は、当社の保有する個人情報については、利用者の本人確認をおこなった後、合理的な範囲で速やかに対応いたします。ただし、他の利用者その他第三者の生命・身体・財産その他の利益を害するおそれのある場合、当社の業務遂行に著しく支障をきたすと判断した場合、対応することが法令に違反する場合には、この限りではありません。開示等の請求を行う場合、詳細な手続きについては下記の問い合わせ先までご連絡ください。
                            </div>
                        </div>
                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                            「個人情報の取り扱いについて」の変更について
                            </h2>
                            <div class="header content-item">
                                当社は、「個人情報の取り扱いについて」を法令に違反しない範囲で任意に変更することが出来るものとします。
                            </div>
                        </div>
                        <div class="p-0 card card-content-three">
                            <h2 class="title-page-second fw-bold">
                                個人情報保護管理者およびお問い合わせ先
                            </h2>
                            <div class="header content-item mb-0">
                                当社は、次の者を個人情報保護管理者に任命し、利用者の個人情報を適切かつ安全に管理し、外部からの不正アクセス、紛失、破壊、改ざん、漏えい等を予防および是正するための対策を講じています。
                            </div>
                            <div class="header content-item">
                                株式会社 bring 個人情報保護管理者：藤井 尊夫
                            </div>

                        </div>

                        <div class="p-0 card card-content-eight">
                            <div class="content content-item">
                                個人情報に関する苦情および相談、開示等についての当社お問い合わせ先は、次のとおりです。
                            </div>
                        </div>
                        <div class="p-0 card card-content-nine">
                            <div class="content content-item">
                                <p class="mb-0 font-ja">株式会社 bring</p>
                                <p class="mb-0 font-ja">住所：〒300-1206 茨城県牛久市ひたち野西3-31-10 ワイズコート203</p>
                                <p class="mb-0 font-ja">電話：029-869-5900</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'

    export default {
        name: 'PrivacyPolicy',
        layout: 'authUnrequired',
        head() {
            return {title: `${ this.$t('general.policy') }`}
        },
    }
</script>

<style lang="scss" scoped>
    @import '../styles/pages/users/privacy-policy.scss';
</style>>

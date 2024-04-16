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
                    <div class="row">
                        <h3 class="title-page text-center fw-bold">{{$t('general.terms')}}</h3>
                    </div>
                </div>

                <div v-if="$i18n.locale === 'vi'" class="row m-4">
                    <div class="card card-content-one">
                        <h4 class="title-page-second fw-bold"></h4>
                        <div class="content">
                            Công ty cổ phần bring (sau đây gọi là Công ty chúng tôi) có quy định như sau về điều khoản khi sử dụng "Shuu navi" (sau đây gọi là "dịch vụ của chúng tôi"). Khách hàng sử dụng dịch vụ của công ty (sau đây gọi là Khách hàng) sau khi đồng ý các điều khoản sử dụng sẽ bắt đầu sử dụng dịch vụ.
                        </div>
                    </div>

                    <div class="card card-content-two">
                        <h4 class="title-page-second fw-bold">
                            Điều 1. Khi sử dụng dịch vụ
                        </h4>
                        <div class="content">
                            Khách hàng cần tuân thủ thỏa thuận này trước khi sử dụng dịch vụ của chúng tôi. Khách hàng sử dụng dịch vụ này được coi là đã đồng ý với các nội dung của thỏa thuận này. Ngoài ra, một số dịch vụ này có thể có các điều khoản sử dụng và hướng dẫn riêng. Trong trường hợp đó, vui lòng tham khảo và sử dụng từng dịch vụ sau khi xác nhận đồng ý. Bên cạnh đó, điều khoản sử dụng của từng dịch vụ sẽ có những mục khác so với quy định chung hoặc có thể sẽ không áp dụng một số điều khoản nhất định. Trong trường hợp đó, các điều khoản quy định, quy tắc của từng dịch vụ sẽ được ưu tiên và có hiệu lực cao đối với quy định chung này.  Tuy nhiên, nếu thỏa thuận này quy định rằng các nội dung trong thỏa thuận này có độ ưu tiên cao hơn các điều khoản sử dụng, hướng dẫn riêng của từng dịch vụ thì điều này sẽ không được áp dụng.
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">Điều 2. Thông tin nội dung dịch vụ</h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Dịch vụ của chúng tôi cung cấp các thông tin về việc làm (sau đây gọi là "thông tin việc làm")  và thông tin có liên quan (sau đây gọi là "thông tin liên quan", bao gồm, nhưng không giới hạn các thông tin khu vực hay thông tin cơ bản về doanh nghiệp, ngành nghề).
                                </li>
                                <li>
                                    Trong dịch vụ này, Công ty chúng tôi cung cấp các thông tin tuyển dụng từ những nhà tuyển dụng thuộc các doanh nghiệp, công ty giới thiệu việc làm, công ty phái cử lao động tới Khách hàng sử dụng dịch vụ. Khách hàng có thể trực tiếp tham gia ứng tuyển và đặt câu hỏi, v.v. (dưới đây gọi là "ứng tuyển") với nhà tuyển dụng. Công ty chúng tôi sẽ không can thiệp tới các thủ tục ứng tuyển (bao gồm, nhưng không giới hạn đề xuất ứng tuyển/ tuyển dụng, điều chỉnh lịch phỏng vấn, lựa chọn và chỉnh sửa thông tin).
                                </li>
                                <li>
                                    Về thông tin việc làm được cung cấp bởi dịch vụ này, Khách hàng có thể trực tiếp nộp đơn cho nhà tuyển dụng mà không cần thông qua trang web của bên thứ ba. Tuy nhiên, Công ty chúng tôi sẽ không có trách nhiệm hay nghĩa vụ phải xử lý cũng như trả lời các câu hỏi về việc ứng tuyển đó của Khách hàng và nhà tuyển dụng sử dụng dịch vụ của chúng tôi.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">Điều 3. Ký kết hợp đồng</h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Công ty chúng tôi không là tổ chức đại diện hay bên được uỷ quyền để ký kết hợp đồng giữa nhà tuyển dụng và Khách hàng sử dụng dịch vụ. Ngoài ra, chúng tôi cũng không là bên đại diện, hòa giải hoặc sắp xếp cho Khách hàng và nhà tuyển dụng ký kết hợp đồng.
                                </li>
                                <li>
                                    Công ty chúng tôi không đảm bảo việc ký kết hợp đồng với nhà tuyển dụng, cũng như không đảm bảo ký kết hợp đồng thành công, nội dung hoặc việc thực hiện trách nhiệm theo hợp đồng cho Khách hàng.
                                </li>
                                <li>
                                    Công ty chúng tôi không đảm bảo ký kết hợp đồng thành công, nội dung hợp đồng hoặc việc thực hiện trách nhiệm theo hợp đồng giữa Khách hàng và nhà tuyển dụng. Trường hợp phát sinh tranh chấp giữa hai bên thì Khách hàng và nhà tuyển dụng sẽ phải tự hòa giải với nhau.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">Điều 4. Bảo mật</h4>
                        <div class="content">
                            Các thông tin liên quan tới Khách hàng mà chúng tôi thu thập được (bao gồm, nhưng không giới hạn ở các thông tin đăng nhập được định nghĩa theo khoản 1, Điều 6 Thông tin đăng ký của Khách hàng) sẽ được sử dụng theo đúng Chính sách bảo mật của công ty. Khách hàng có thể tham khảo chính sách bảo mật thông tin cá nhân của công ty <nuxt-link
                                :to="localePath(`/privacy-policy`, $i18n.locale)">tại đây</nuxt-link>. Ngoài ra, các trang web của bên thứ ba (bao gồm cả nhà tuyển dụng) mà Khách hàng có thể truy cập, chẳng hạn như các liên kết đính kèm trong dịch vụ này cũng có chính sách bảo mật và nguyên tắc thu thập dữ liệu riêng. Công ty chúng tôi không có trách nhiệm hay nghĩa vụ nào đối với quy định hay hoạt động này. Khách hàng có trách nhiệm tự quản lý, duy trì thông tin đăng nhập hay mật khẩu tại trang web của bên thứ ba.
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">Điều 5. Sử dụng thông tin cá nhân</h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Trong dịch vụ này, chúng tôi sẽ là người điều hành xử lý thông tin cá nhân. Vui lòng xem "Chính sách bảo mật" để biết tên, chức danh của người phụ trách bảo vệ thông tin cá nhân và thông tin liên hệ.
                                </li>
                                <li>
                                    Mục đích sử dụng
                                    <br/>
                                    Công ty chúng tôi cung cấp các dịch vụ cho Khách hàng và sẽ thu thập một số thông tin cần thiết của Khách hàng (bao gồm, nhưng không giới hạn ở các Thông tin đăng ký được định nghĩa tại khoản 1, Điều 6 Thông tin đăng ký của Khách hàng) với những mục đích sử dụng sau.
                                    <br/>
                                    (1) Gửi email tuyển dụng mới, thông tin tuyển dụng đề xuất, thông báo về dịch vụ này và bảng câu hỏi điều tra.
                                    <br/>
                                    (2) Giới thiệu các sản phẩm và dịch vụ của Công ty chúng tôi hoặc các công ty thuộc tập đoàn của chúng tôi.
                                    <br/>
                                    (3) Thúc đẩy sử dụng các dịch vụ của chúng tôi như tạo dữ liệu thống kê sau khi chỉnh thông tin cá nhân sang dạng thông tin không xác định rõ đối tượng Khách hàng. Trường hợp Khách hàng đăng ký các đợt khuyến mại kèm theo dịch vụ này, thông tin Khách hàng sẽ được sử dụng với mục đích gửi phần thưởng hay để liên lạc với người trúng thưởng.
                                    <br/>
                                    (4) Cung cấp thông tin cá nhân Khách hàng cho nhà tuyển dụng dựa trên phần ứng tuyển của Khách hàng khi sử dụng dịch vụ.
                                    <br/>
                                    (5) Trả lời cho các câu hỏi phổ biến từ Khách hàng.
                                    <br/>
                                    (6) Phát triển dịch vụ mới hoặc để cải thiện dịch vụ hiện hành.
                                </li>
                                <li>
                                    Cung cấp thông tin cho bên thứ ba
                                    <br/>
                                    Công ty chúng tôi sẽ không cung cấp thông tin Khách hàng cho bên thứ ba trừ các trường hợp sau đây:
                                    <br/>
                                    (1) Nhận được sự cho phép của chính Khách hàng. (Khách hàng ứng tuyển việc làm trên dịch vụ này được coi như đã đồng ý cung cấp thông tin cá nhân cho bên thứ ba).
                                    <br/>
                                    (2) Chỉnh thông tin cá nhân sang dạng thông tin không xác định rõ đối tượng Khách hàng khi tiết lộ, cung cấp dữ liệu thống kê sau.
                                    <br/>
                                    (3) Theo quy định của pháp luật.
                                    <br/>
                                    (4) Khi cần thiết để bảo vệ tính mạng, thân thể hoặc tài sản của con người và khó được sự đồng ý của Khách hàng.
                                    <br/>
                                    (5) Khi cần thiết để cải thiện sức khỏe cộng đồng hoặc thúc đẩy sự phát triển lành mạnh của trẻ em và khó nhận được sự đồng ý của Khách hàng.
                                    <br/>
                                    (6) Khi cần hợp tác với nhà nước hoặc cơ quan địa phương hay người được ủy thác để thực hiện các công việc do luật pháp quy định mà có rủi ro gây cản trở tới việc hoàn thành công việc đó do phải nhận được đồng ý của Khách hàng.
                                    <br/>
                                </li>
                                <li>
                                    Ủy thác
                                    <br/>
                                    Chúng tôi có thể ủy thác toàn bộ hoặc một phần việc xử lý thông tin cá nhân của Khách hàng trong phạm vi cần thiết cho mục đích sử dụng nêu trên sau khi thực hiện các biện pháp bảo vệ cần thiết.
                                </li>
                                <li>
                                    Tiết lộ, chỉnh sửa, xóa, ngừng sử dụng thông tin cá nhân
                                    <br/>
                                    Khi Khách hàng yêu cầu Công ty chúng tôi thông báo, tiết lộ, chỉnh sửa, thêm, xóa, ngừng sử dụng hoặc xóa thông tin cá nhân của mình, chúng tôi sẽ tiếp nhận theo phương thức được quy định trong “Xử lý thông tin cá nhân”.
                                </li>
                                <li>
                                    Một số trường hợp khác
                                    <br/>
                                    Việc điền thông tin cá nhân là tự nguyện. Tuy nhiên, nếu Khách hàng không điền đầy đủ thông tin tất cả các mục, một số dịch vụ của chúng tôi có thể không thể đáp kỳ vọng của Khách hàng.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-seven">
                        <h4 class="title-page-second fw-bold">
                            Điều 6. Thông tin đăng ký của Khách hàng
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Các thông tin Khách hàng sử dụng để đăng ký sử dụng dịch vụ của chúng tôi như họ tên, địa chỉ, kinh nghiệm làm việc, giới thiệu bản thân (dưới đây gọi tắt là Thông tin đăng ký) được coi là chính xác, đúng sự thật. Trường hợp phát sinh mâu thuẫn với nhà tuyển dụng hoặc bên thứ 3 liên quan tới Thông tin đăng ký, mọi mâu thuẫn sẽ giải quyết bằng chi phí và trách nhiệm của Khách hàng.
                                </li>
                                <li>
                                    Khi có sự thay đổi, chỉnh sửa, tạo mới hoặc bổ sung Thông tin đăng ký (sau đây gọi là "Thay đổi thông tin đăng ký"), Khách hàng cần có trách nhiệm nhanh chóng thực hiện thủ tục thay đổi. Chúng tôi sẽ không tự ý thay đổi nội dung Thông tin đăng ký.
                                </li>
                                <li>
                                    Chúng tôi có thể xóa Thông tin đăng ký mà không cần thông báo cho Khách hàng trong các trường hợp sau.
                                    <br/>
                                    (1) Khi Khách hàng rút khỏi hội thành viên dựa trên các quy định tại Điều 8 (Rời hội thành viên).
                                    <br/>
                                    (2) Khi Khách hàng không đăng nhập vào dịch vụ của chúng tôi trong một khoảng thời gian nhất định.
                                    <br/>
                                    (3) Khi dịch vụ này bị chấm dứt vì bất kỳ lý do gì.
                                    <br/>
                                    (4) Khi chúng tôi cho là phù hợp.
                                    <br/>
                                    Tuy nhiên, chúng tôi không có nghĩa vụ phải xóa Thông tin đăng ký của Khách hàng. Chúng tôi sẽ thực hiện quản lý theo Luật Bảo vệ thông tin cá nhân (điều 57, năm 2003) và lưu giữ trong một thời gian nhất định.
                                </li>
                                <li>
                                    Căn cứ theo các mục trên, khi Thông tin đăng ký bị xóa, những thông tin sau sẽ được chỉnh sang dạng thông tin không xác định rõ đối tượng Khách hàng và côn ty chúng tôi sẽ sử dụng những thông tin này nhằm mục đích thúc đẩy sử dụng dịch vụ của chúng tôi như tạo dữ liệu thống kê, v.v.
                                    <br/>
                                    (1) Nhà tuyển dụng do Khách hàng đăng ký.
                                    <br/>
                                    (2) Nghề nghiệp hiện tại của Khách hàng khi đăng ký.
                                    <br/>
                                    (3) Tỉnh thành do Khách hàng đăng ký và hiện đang cư trú.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-eight">
                        <h4 class="title-page-second fw-bold">
                            Điều 7. Đăng ký và quản lý tài khoản đăng nhập
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Khách hàng phải chịu trách nhiệm đăng ký và quản lý tài khoản đăng nhập, mật khẩu (sau đây gọi là "Tài khoản đăng nhập") được cấp cùng với thông tin đăng ký. Chúng tôi sẽ không chịu trách nhiệm cho bất kỳ thiệt hại nào do sự thiếu quản lý, sai sót trong quá trình sử dụng của Khách hàng, hay do việc sử dụng của bên thứ ba.
                                </li>
                                <li>
                                    Khách hàng có quyền truy cập dữ liệu cá nhân trong tài khoản đăng nhập mà chúng tôi cung cấp và tất cả nội dung truy cập sẽ thuộc trách nhiệm quản lý của Khách hàng.
                                </li>
                                <li>
                                    Khách hàng không được cho phép bên thứ ba sử dụng tài khoản đăng nhập hoặc chuyển nhượng, cho mượn, đặt tài sản thế chấp, hoặc xử lý bất cứ thứ gì khác.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-nine">
                        <h4 class="title-page-second fw-bold">
                            Điều 8. Rời hội thành viên
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Nếu Khách hàng muốn rời hội thành viên thì cần làm thủ tục rời hội theo quy định của chúng tôi.
                                </li>
                                <li>
                                    Khi Khách hàng rời hội thành viên, tất cả các quyền và lợi ích liên quan đến tài khoản đăng nhập của dịch vụ này sẽ bị xóa bỏ.
                                </li>
                                <li>
                                    Khi Khách hàng rời hội thành viên, thông tin đăng ký trước khi rời hội sẽ không được khôi phục ngay cả khi Khách hàng muốn đăng ký lại với nội dung tương tự một phần hoặc toàn bộ thông tin đăng ký trước đó.
                                </li>
                                <li>
                                    Ngay cả khi Khách hàng rời hội thành viên, thỏa thuận này sẽ vẫn có hiệu lực khi Khách hàng sử dụng dịch vụ này.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-ten">
                        <h4 class="title-page-second fw-bold">
                            Điều 9. Thiết bị sử dụng
                        </h4>
                        <div class="content">
                            Khách hàng cần phải truy cập vào trang web để sử dụng dịch vụ này vì vậy việc chuẩn bị và sử dụng các thiết bị, phần mềm phù hợp để truy cập là rất cần thiết. Chúng tôi hoàn toàn không liên quan tới việc chuẩn bị để Khách hàng truy cập Web của chúng tôi hay các phương thức sử dụng của Khách hàng. Ngoài ra, chúng tôi cũng áp dụng các quy định của nhà phân phối phần mềm cho các ứng dụng cần thiết để duyệt web.
                        </div>
                    </div>

                    <div class="card card-content-ten">
                        <h4 class="title-page-second fw-bold">
                            Điều 10. Mục đích sử dụng
                        </h4>
                        <div class="content">
                            Dịch vụ này chỉ được cung cấp cho mục đích sử dụng cá nhân và phi thương mại của Khách hàng. Chỉ khi nhận được sự đồng ý trước của chúng tôi, bất kể toàn bộ hay một phần việc sử dụng, truy cập vào dịch vụ này của Khách hàng nhằm mục đích hoạt động kinh doanh hoặc lợi nhuận khác hay các hành vi tương tự như sử dụng để chuẩn bị cho mục đích đó đều bị nghiêm cấm. Ngoài ra, dịch vụ này không được sử dụng cho các hoạt động tôn giáo, hoạt động chính trị hoặc các mục đích tương tự.
                        </div>
                    </div>

                    <div class="card card-content-twelve">
                        <h4 class="title-page-second fw-bold">
                            Điều 11. Bản quyền, quyền tài sản và các quyền khác
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Bản quyền, quyền nhãn hiệu và các quyền tài sản khác liên quan đến nội dung có trong dịch vụ này và thông tin cá nhân, nhãn hiệu, hình ảnh, video, quảng cáo, thiết kế, v.v. (sau đây gọi là "Các nội dung") đều thuộc Công ty chúng tôi hoặc tác giả và chủ sở hữu bản quyền đã tạo ra các nội dung đó.
                                </li>
                                <li>
                                    Dịch vụ này và tất cả phần mềm được sử dụng liên quan đều bao gồm các quyền tài sản được pháp luật và các quy định liên quan đến quyền sở hữu trí tuệ bảo vệ.
                                </li>
                                <li>
                                    Chỉ những Khách hàng được Công ty chúng tôi hoặc bên thứ ba có bản quyền hay các quyền tài sản khác cho phép sử dụng hoặc được phép sử dụng theo luật định mà không cần sự cho phép của người sở hữu, mọi hành vi sao chép, chỉnh sửa, sửa đổi, đăng tải, in lại, truyền tải công khai, phân phối, buôn bán, cung cấp, biên dịch hoặc sử dụng nội dung của dịch vụ này đều bị nghiêm cấm.
                                </li>
                                <li>
                                    Công ty chúng tôi sẽ không chịu trách nhiệm cho bất kỳ thiệt hại nào do Khách hàng vi phạm các nội dung trên. Ngoài ra, trường hợp Khách hàng kiếm được lợi nhuận từ các hành vi này, Công ty chúng tôi sẽ có quyền yêu cầu số tiền tương đương với lợi nhuận đó.
                                </li>
                                <li>
                                    Khách hàng chỉ rõ, đảm bảo rằng các thông tin PR bản thân và tất cả các thông tin khác có trong Thông tin đăng ký không vi phạm bản quyền hoặc bất kỳ quyền nào khác của Công ty hoặc bên thứ ba.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-thirteen">
                        <h4 class="title-page-second fw-bold">
                            Điều 12. Thay đổi, chấm dứt nội dung dịch vụ
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Công ty chúng tôi có thể thay đổi, tạm ngừng hoặc chấm dứt tất cả hoặc một phần của dịch vụ này (bao gồm cả nội dung thông tin được cung cấp trong dịch vụ này) mà không cần thông báo trước cho Khách hàng. Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào gây ra cho Khách hàng hoặc bên thứ ba.
                                </li>
                                <li>
                                    Công ty chúng tôi có thể tạm ngừng hoặc đình chỉ việc cung cấp toàn bộ hoặc một phần dịch vụ này mà không cần thông báo trước cho Khách hàng khi xảy ra bất kỳ lý do nào sau đây. Chúng tôi sẽ không chịu bất kỳ trách nhiệm nào ngay cả khi Khách hàng hoặc bên thứ ba bị thiệt hại do những điều này.
                                    <br/>
                                    (1) Khi việc bảo trì thiết bị hoặc xây dựng khác liên quan đến trang web này này do Công ty chúng tôi hoặc bên thứ ba do Công ty chúng tôi chỉ định.
                                    <br/>
                                    (2) Khi thiết bị bị lỗi hoặc hỏng hóc liên quan đến trang web này do Công ty chúng tôi hoặc bên thứ ba do Công ty chúng tôi chỉ định.
                                    <br/>
                                    (3) Khi xảy ra thiên tai như động đất, lũ lụt, sóng thần, chiến tranh, hỗn loạn, bạo loạn, mất điện hoặc các trường hợp khẩn cấp khác.
                                    <br/>
                                    (4) Theo yêu cầu của các tổ chức như cơ quan tư pháp hoặc cơ quan hành chính.
                                    <br/>
                                    (5) Khi Công ty chúng tôi cho là cần thiết vì các lý do vận hành hoặc kỹ thuật khác.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-fourteen">
                        <h4 class="title-page-second fw-bold">
                            Điều 13. Phương thức liên lạc với Khách hàng
                        </h4>
                        <div class="content">
                            Chúng tôi sẽ liên hệ và thông báo với Khách hàng qua địa chỉ email hoặc thông tin liên hệ khác được đăng trên trang web của chúng tôi hoặc được liệt kê trong Thông tin đăng ký tùy theo sự lựa chọn của chúng tôi.
                        </div>
                    </div>

                    <div class="card card-content-fifteen">
                        <h4 class="title-page-second fw-bold">
                            Điều 14. Điều khoản miễn trách
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Chúng tôi luôn chú ý, cung cấp đầy đủ thông tin tuyển dụng, nhưng chúng tôi không đảm bảo tính chính xác, hợp lệ, hợp pháp, an toàn, liên quan, hữu ích hoặc bất kỳ vấn đề nào khác của thông tin. Chúng tôi sẽ không chịu trách nhiệm về bất kỳ thiệt hại nào của Khách hàng liên quan đến thông tin này.
                                </li>
                                <li>
                                    Khách hàng có trách nhiệm xác nhận trực tiếp với nhà tuyển dụng về nội dung cuối cùng của thông tin công việc.
                                </li>
                                <li>
                                    Đối với các thông tin (bao gồm thông tin cá nhân) do Khách hàng cung cấp khi ứng tuyển, liên hệ với nhà tuyển dụng, Công ty chúng tôi không đảm bảo tính hợp pháp, hợp lệ hay bất kì vấn đề nào khác về phương pháp xử lý thông tin do nhà tuyển dụng cung cấp. Chúng tôi sẽ không chịu trách nhiệm về bất kì thiệt hại nào liên quan đến phương pháp xử lý thông tin này. Ngoài ra, Khách hàng sẽ chịu trách nhiệm xác nhận trực tiếp với nhà tuyển dụng về phương pháp xử lý thông tin đó.
                                </li>
                                <li>
                                    Công ty chúng tôi không đảm bảo (dù rõ ràng hay ngụ ý) bất kỳ điều nào như nội dung tài chính của nhà tuyển dụng đăng tuyển trong dịch vụ này, tư cách pháp nhân của doanh nghiệp, tính hợp pháp của hoạt động kinh doanh do công ty niêm yết điều hành hay tính chuẩn xác trong xã hội,… Khách hàng tự quyết định và chịu trách nhiệm khi ứng tuyển.
                                </li>
                                <li>
                                    Chúng tôi cung cấp các thông tin đa dạng liên quan đến thông tin tuyển dụng trong dịch vụ này, tuy nhiên, chúng tôi không đảm bảo tính chính xác, hợp lệ, hợp pháp, an toàn, phù hợp, tính hữu dụng, sự đáng tin cậy, tính toàn diện, cập nhật, kịp thời, đầy đủ hay bất kì vấn đề nào khác của các nội dung trên. Công ty chúng tôi và bên cung cấp thông tin cho chúng tôi sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại nào của Khách hàng liên quan đến các thông tin này.
                                </li>
                                <li>
                                    Tất cả hoặc một phần thông tin được cung cấp trong dịch vụ này có thể bị thay đổi, tạm ngừng hoặc bị ngừng mà không cần thông báo cho Khách hàng.
                                </li>
                                <li>
                                    Đối với các quảng cáo (dưới bất kỳ hình thức nào) được đăng tải trên dịch vụ này hay các website khác được liên kết trong dịch vụ này, chúng tôi không đảm bảo (dù rõ ràng hay ngụ ý) tính chính xác, tính khẩn cấp, tính toàn diện, tính thương mại hay mục đích của nội dung. Ngoài ra, chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại hoặc bất lợi nào gây ra cho Khách hàng hoặc bên thứ ba. Khách hàng phải tự quyết định và chịu trách nhiệm về nội dung quảng cáo và các trang web bên ngoài được liên kết.
                                </li>
                                <li>
                                    Công ty sẽ không chịu trách nhiệm về bất kỳ tranh chấp nào giữa Khách hàng và nhà tuyển dụng hoặc các bên thứ ba khi sử dụng dịch vụ này.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-sixteen">
                        <h4 class="title-page-second fw-bold">
                            Điều 15. Sử dụng thông tin
                        </h4>
                        <div class="content">
                            Công ty chúng tôi có thể sẽ sử dụng thông tin thu được thông qua dịch vụ này và thông tin do Khách hàng cung cấp hoặc điền vào để phân tích, đánh giá và cung cấp thông tin cho bên thứ ba.
                        </div>
                    </div>

                    <div class="card card-content-seventeen">
                        <h4 class="title-page-second fw-bold">
                            Điều 16. Liên kết đến website khác
                        </h4>
                        <div class="content">
                            Trong dịch vụ này, chúng tôi có thể thiết lập các liên kết đến các trang web và tài nguyên khác và các bên thứ ba có thể đăng ký các liên kết và theo dõi đến các trang web và tài nguyên khác. Các trang web và tài nguyên được liên kết sẽ do mỗi nhà điều hành riêng quản lý độc lập. Chúng tôi không liên quan và cũng không chịu bất kỳ trách nhiệm nào về nội dung cũng như sự an toàn của các liên kết này.
                        </div>
                    </div>

                    <div class="card card-content-eighteen">
                        <h4 class="title-page-second fw-bold">
                            Điều 17. Các hành vi bị nghiêm cấm
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Các hành vi sau đây đều bị nghiêm cấm và Khách hàng không được vi phạm.
                                    <br/>
                                    (1) Hành vi quản lý toàn bộ hoặc một phần thông tin do dịch vụ này cung cấp với mục đích sao chép, tái tạo, nhân bản, gửi, chuyển, phân phối, bán lại, truyền, có thể được truyền hoặc sửa đổi, phỏng theo, biên dịch, cho mượn hoặc lưu trữ mà không có sự đồng ý trước của công ty.
                                    <br/>
                                    (2) Tất cả các hành vi vi phạm thỏa thuận này hoặc các điều khoản sử dụng, hướng dẫn của các dịch vụ.
                                    <br/>
                                    (3) Các hành vi vi phạm trật tự công cộng, đạo đức hoặc các hành vi có nguy cơ đó.
                                    <br/>
                                    (4) Các hành vi phạm tội, các hành vi bất hợp pháp hoặc các hành vi có nguy cơ đó.
                                    <br/>
                                    (5) Các hành vi gây bất lợi cho Khách hàng khác hoặc bên thứ ba hoặc các hành vi có nguy cơ đó.
                                    <br/>
                                    (6) Các hành vi gây cản trở cho việc vận hành dịch vụ này hoặc các hành vi có nguy cơ đó.
                                    <br/>
                                    (7) Các hành vi gây ảnh hưởng đến uy tín của Công ty chúng tôi hoặc dịch vụ này hoặc các hành vi có nguy cơ đó.
                                    <br/>
                                    (8) Các hành vi xâm phạm quyền sở hữu trí tuệ (bao gồm, nhưng không giới hạn bản quyền, quyền thiết kế, mô hình tiện ích, quyền nhãn hiệu, bằng sáng chế, bí quyết…), danh dự, quyền riêng tư, các quyền và lợi ích khác của Công ty chúng tôi hoặc bên thứ ba hoặc các hành vi có nguy cơ đó.
                                    <br/>
                                    (9) Các hành vi xúi giục vi phạm các nội dung trên.
                                    <br/>
                                    (10) Ngoài ra, còn một số điều Công ty chúng tôi cho là không phù hợp.
                                </li>
                                <li>
                                    Nếu Khách hàng có bất kỳ hành vi nào nêu trên, Công ty chúng tôi sẽ ngừng cung cấp dịch vụ này cho Khách hàng và thực hiện các biện pháp xử lý thích hợp. Chúng tôi cũng có thể thực hiện các biện pháp đó nếu chúng tôi xác định rằng Khách hàng đã vi phạm nội dung hoặc mục đích của thỏa thuận này hoặc đã có hành vi không phù hợp theo tinh thần của thỏa thuận này. Chúng tôi có thể thực hiện các biện pháp đó nếu Khách hàng có hành vi không đúng hoặc đi quá trách nhiệm pháp lý khác của mình. Xin lưu ý rằng chúng tôi sẽ không trả lời cho Khách hàng lý do tại sao chúng tôi thực hiện các biện pháp như vậy. Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào gây ra cho Khách hàng do các biện pháp nêu trên của chúng tôi.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-nineteen">
                        <h4 class="title-page-second fw-bold">
                            Điều 18. Thay đổi Điều khoản sử dụng
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    Chúng tôi có thể thay đổi Điều khoản sử dụng và hiệu lực của Điều khoản sau khi thay đổi bắt đầu từ ngày có hiệu lực do chúng tôi quyết định.
                                </li>
                                <li>
                                    Trong trường hợp nêu trên, công ty sẽ thông báo trước cho Khách hàng về nội dung thay đổi của Điều khoản và ngày có hiệu lực trước đó ít nhất một tháng. Tuy nhiên, nếu Công ty chúng tôi xác định rằng mức độ bất lợi cho Khách hàng do thay đổi là nhỏ, thì thời gian thông báo có thể được rút ngắn.
                                </li>
                                <li>
                                    Các quy định nêu trên không áp dụng cho trường hợp sự thay đổi của Điều khoản này phù hợp với lợi ích chung của Khách hàng.
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-twenty">
                        <h4 class="title-page-second fw-bold">
                            Điều 19. Luật điều chỉnh, quyền tài phán
                        </h4>
                        <div class="content">
                            Các thủ tục tố tụng liên quan đến thỏa thuận này sẽ được tiến hành tại Tòa án sơ thẩm Tokyo hoặc Tòa án thành phố Tokyo, đây là Tòa án có thẩm quyền xét xử sơ thẩm thỏa thuận, tùy thuộc vào tính chất, mức độ phức tạp của vụ việc.
                        </div>
                    </div>

                    <div class="card card-content-twenty-one">
                        <div class="content">
                            Ngày ban hành: 01/02/2022
                        </div>
                    </div>

                </div>

                <div v-else class="row m-4">
                    <div class="card card-content-one">
                        <h4 class="title-page-second fw-bold"></h4>
                        <div class="content">
                            株式会社bring（以下「当社」といいます。）は、「Shuu ナビ」（以下「本サービス」といいます。）の利用につき、以下のとおり利用規約（以下「本規約」といいます。）を定めます。本サービスの利用者（以下「利用者」といいます。）は、予め本規約に同意の上、本サービスを利用するものとします。
                        </div>
                    </div>

                    <div class="card card-content-two">
                        <h4 class="title-page-second fw-bold">
                            第1条（サービスのご利用に際して）
                        </h4>
                        <div class="content">
                            利用者は本規約を遵守の上、本サービスをご利用ください。利用者が本サービスをご利用された場合、本規約の内容を承諾いただいたものとします。また本サービスのうち、一部のサービスでは利用規約やガイドライン等を別途定める場合があります。その場合、それらも合わせてご参照いただき、承諾いただいた上で各サービスをご利用下さい。 なお、各サービスの利用規約・ガイドラインなどにおいて本規約の一部の適用を排除、又は本規約と異なる事項を定める場合があります。その場合は各サービスの利用規約・ガイドラインなどの条項が本規約に優先して効力を有するものとします。ただし、本規約において、各サービスの利用規約・ガイドラインなどの条項に優先する旨を規定している場合はこの限りではありません。
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">第2条（本サービスの内容）</h4>
                        <div class="content">
                            <ol>
                                <li>
                                    本サービスは、求人に関する情報（以下「求人情報」といいます。）及び求人情報に関連する情報（以下「関連情報」といい、業界及び企業に関する一般的な情報や地域情報等を含みますがこれらに限られません。）の提供サービスです。
                                </li>
                                <li>
                                    本サービスにおいて、当社は、利用者に対して、企業、職業紹介事業者、労働者派遣事業者等の求人者からの求人情報の提供を行います。求人への応募・問い合わせ等（以下「応募等」といいます。）は利用者が求人者に対して直接行うこととし、当社は応募等に関する一切の手続き（応募・採用の勧奨、採用面接日時の調整、情報の選別・加工を含みますがこれらに限られません。）に関与しません。
                                </li>
                                <li>
                                    利用者は、本サービスにおいて提供する一部の求人情報については、外部の第三者サイトを経ることなく、求人者に対して直接応募することができますが、当該応募等について、当社は前項と同様に、利用者又は求人者に対して回答その他の対応する義務を負わず、対応しないことについて一切の責任を負わないものとします。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">第3条（契約の締結）</h4>
                        <div class="content">
                            <ol>
                                <li>
                                    当社は、利用者と求人者との間で締結される個別の契約等につき何ら当事者又は代理人となるものではなく、 また、利用者及び求人者のいずれに対しても、契約締結の代理・媒介・あっ旋等を行いません。
                                </li>
                                <li>
                                    当社は利用者に対し、求人者との契約の締結を保証するものではなく、また契約の成否、内容又は履行等について一切保証いたしません。
                                </li>
                                <li>
                                    当社は利用者と求人者との契約の成否、内容又は履行等に関し、何ら責任を負わないものとし、利用者と求人者との間の紛争については利用者と求人者との間で解決するものとします。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">第4条（プライバシー）</h4>
                        <div class="content">
                            当社が取得した利用者に関する情報（第6条1項（利用者の登録情報）に定義する登録情報を含みますがこれに限られません。）
                            は、当社の個人情報保護方針に従って取り扱われます。当社の個人情報保護方針に関しては、
                            <nuxt-link :to="localePath(`/privacy-policy`, $i18n.locale)">こちら</nuxt-link>
                            の記載 をご参照ください。 また、本サービス中に設定されたリンクを通じるなど、利用者がアクセスできる第三者（求人者を含みます。）
                            のサイトなどは当社とは独立した個々のプライバシー規程やデータ収集規程を持っています。
                            当社はこれらの独立した規程や活動に対していかなる義務や責任も負っておりません。
                            当該第三者サイトでのパスワードや登録情報の保持・管理は、利用者ご自身の責任で行ってください。
                        </div>
                    </div>

                    <div class="card card-content-three">
                        <h4 class="title-page-second fw-bold">第5条（個人情報の取扱い）</h4>
                        <div class="content">
                            <ol>
                                <li>
                                    本サービスにおいては、当社が個人情報取扱事業者となります。名称、個人情報保護管理責任者等の職名、連絡先については、
                                    「個人情報保護方針」をご覧下さい。
                                </li>
                                <li>
                                    利用目的 <br/>
                                    当社は、利用者に対して本サービスを提供するにあたり、必要な一定の利用者の個人情報（第6条1項（利用者の登録情報）
                                    に定義する登録情報を含みますがこれに限られません。以下、本条において同様です。）を取得しますが、
                                    これらの個人情報の利用目的は以下のとおりです。
                                    <br/>
                                    (1) 新着求人メール、おすすめの求人情報、本サービスに関するお知らせ、アンケート等の情報を配信するため。<br/>
                                    (2) 当社又は当社のグループ会社の商品、サービスをご案内するため。<br/>
                                    (3) 個人を識別できない形式に加工した上、統計データを作成するなど当社サービスの利用促進のため。
                                    なお、利用者が本サービスに付随するキャンペーン等に応募した場合には、上記の他、当選連絡及び景品郵送の目的で利用します。
                                    <br/>
                                    (4) 本サービスにおいて利用者が行った求人への応募に基づき、当該求人者へ利用者の個人情報を提供するため。<br/>
                                    (5) 利用者からの一般的な問い合わせに対する回答を行うため。<br/>
                                    (6) 本サービスの改善及び新規サービスの開発に利用するため。
                                </li>
                                <li>
                                    第三者提供
                                    <br/>
                                    当社は、以下のいずれかに該当する場合を除き、 利用者の個人情報を第三者へ提供いたしません。<br/>
                                    (1) 利用者ご本人の同意があるとき。（本サービスにおいて利用者が求人へ応募した場合も提供の同意があったものとします。）
                                    <br/>
                                    (2) 利用者ご本人を識別することができない状態で統計的なデータとして開示・提供するとき。<br/>
                                    (3) 法令に基づくとき。<br/>
                                    (4) 人の生命、身体又は財産の保護のために必要な場合で、利用者の同意を得ることが困難なとき。<br/>
                                    (5) 公衆衛生の向上又は児童の健全な育成の推進のために特に必要があるときに、利用者の同意を得ることが困難なとき。<br/>
                                    (6) 国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要があるときに、
                                    利用者の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき。
                                </li>
                                <li>
                                    業務委託<br/>
                                    当社は取得した個人情報の取扱いの全部又は一部を、必要な保護措置を講じた上、上記利用目的に必要な範囲において、
                                    委託する場合があります。
                                </li>
                                <li>
                                    開示、訂正・削除、利用停止等<br/>
                                    利用者が、当社に対してご自身の個人情報の利用目的の通知、開示、訂正・追加・削除、利用停止又は消去の請求を行う場合は、
                                    「個人情報の取扱いについて」に定めた方法にてお受けいたします。
                                </li>
                                <li>
                                    その他<br/>
                                    個人情報の入力は任意です。すべての項目にご入力いただけなかった場合、各種サービスにおいて、
                                    適切な対応ができなくなる場合がありますのでご了解下さい。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-seven">
                        <h4 class="title-page-second fw-bold">
                            第6条（利用者の登録情報）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    利用者は、氏名・住所・職務経歴・自己PRその他の個人情報を登録して本サービスをご利用される場合
                                    （以下、これにより登録された情報をすべて「登録情報」といいます。）、真実かつ正確な情報を登録するものとし、
                                    登録情報に関連して求人者その他の第三者との間でトラブル等が生じた場合は、
                                    利用者自身の費用及び責任において解決するものとします。
                                </li>
                                <li>
                                    利用者は、登録情報に変更・修正・加工・追加（以下「変更等」といいます。）があるときは、
                                    自らの責任で速やかに変更手続きを行うものとします。当社が自らの判断で登録情報の内容について変更等を行うことはありません
                                </li>
                                <li>
                                    当社は、以下の場合、予告なく登録情報の抹消を行うことができます。ただし、当社が抹消の義務を負うものではなく、
                                    個人情報保護法（平成15年法律第57号）その他の法令及び各種当社規程にしたがい管理をしたうえで、
                                    一定期間保有することがあります。<br/>
                                    (1)利用者が第8条（退会）の規定にもとづき退会したとき。<br/>
                                    (2)利用者が一定期間本サービスにログインしないとき。<br/>
                                    (3)理由の如何を問わず本サービスが終了したとき。<br/>
                                    (4)その他当社が適当と判断したとき。
                                </li>
                                <li>
                                    当社は、前項に基づき、登録情報の抹消を行った場合であっても、以下の情報については個人を識別できない形式に加工した上、
                                    統計データを作成するなど当社サービスの利用促進のため利用できるものとします。<br/>
                                    (1)利用者が応募した求人者。<br/>
                                    (2)利用者が登録していた現在の職種。<br/>
                                    (3)利用者が登録していた現在居住している都道府県。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-eight">
                        <h4 class="title-page-second fw-bold">
                            第7条（ログインアカウント等の登録・管理）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    利用者は、登録情報に付随して発行されたログインアカウント及びパスワード（以下「ログインアカウント等」といいます。）
                                    の登録・管理等をご自身の責任において行うものとし、利用者の管理不十分、使用上の過誤、第三者の使用等により生じた損害につい
                                    て、当社は一切の責任を負わないものとします。
                                </li>
                                <li>
                                    当社は、利用者によるアクセスについて、使用されたログインアカウント等が当該利用者に対し当社から発行されたものである場合に
                                    は、当該利用者によるアクセスとみなし、当該アクセスによって生じた全ての事象、
                                    内容は利用者の管理責任のもとで行われたものとみなします。
                                </li>
                                <li>
                                    利用者は、ログインアカウント等を第三者に使用させ、又は譲渡、貸与、担保設定その他一切の処分を行うことはできないものと
                                    します。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-nine">
                        <h4 class="title-page-second fw-bold">
                            第8条（退会）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    利用者が退会を希望する場合は、当社の所定の退会手続きを行うものとします。
                                </li>
                                <li>
                                    利用者は、退会をした場合、本サービスのログインアカウントに関する一切の権利、特典を失います。
                                </li>
                                <li>
                                    利用者が退会をした場合は、利用者が退会前の登録情報の一部又は全部と同じ内容をもって再度登録を希望したときであっても、
                                    退会前の登録情報は復元されません。
                                </li>
                                <li>
                                    利用者が退会をした場合であっても、利用者が本サービスを利用するときは、依然として本規約は効力を有するものとします。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-ten">
                        <h4 class="title-page-second fw-bold">
                            第9条（ご利用のための設備）
                        </h4>
                        <div class="content">
                            利用者が本サービスをご利用になるためには、Webにアクセスしていただく必要があります。利用者には自らの責任と費用で必要な機器、
                            ソフトウェアを適切に準備、操作していただく必要があり、当社は、利用者がWebにアクセスされるための準備、
                            操作方法などについては一切関与いたしません。また、閲覧に必要なアプリケーションなどを利用する際には、
                            そのソフトウェアの配布元の規定が適用されます。
                        </div>
                    </div>

                    <div class="card card-content-ten">
                        <h4 class="title-page-second fw-bold">
                            第10条（ご利用の目的について）
                        </h4>
                        <div class="content">
                            本サービスは利用者の私的かつ非営利目的でのご利用に限定して提供しています。当社が事前に承諾した場合を除き、
                            本サービスのご利用や本サービスへのアクセスについて、その全部あるいは一部を問わず、
                            営業活動その他の営利を目的としたご利用又はそれに準ずる行為、そのための準備行為としてのご利用は固くお断りいたします。また、
                            その他、宗教活動、政治活動又はそれに類する目的での利用も行ってはならないものとします。
                        </div>
                    </div>

                    <div class="card card-content-twelve">
                        <h4 class="title-page-second fw-bold">
                            第11条（著作権、財産権その他の権利）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    本サービスに含まれているコンテンツ及び個々の情報、商標、画像、動画、広告、デザイン等（以下、「コンテンツ等」といいます）
                                    に関する著作権、商標権その他の財産権は当社もしくは当該コンテンツ等を創作した著作者又は著作権者に帰属しています。
                                </li>
                                <li>
                                    本サービス及び関連して使用されている全てのソフトウェアは、知的財産権に関する法令等により保護されている
                                    財産権を含んでいます。
                                </li>
                                <li>
                                    利用者は、当社もしくは著作権その他の財産権を有する第三者から利用・使用を許諾されている場合、又は、
                                    法令により権利者からの許諾なく利用又は使用が許容されている場合を除き、本サービスの内容を複製、編集、改変、掲載、
                                    転載、公衆送信、配布、販売、提供、翻訳その他あらゆる利用又は使用を行ってはなりません。
                                </li>
                                <li>
                                    利用者が前項に反する行為によって被った損害については、当社は一切の責任を負いかねます。
                                    また、利用者がこれらの行為によって利益を得た場合、当社はその利益相当額を請求できる権利を有するものとします。
                                </li>
                                <li>
                                    利用者は、登録情報に記載する自己PRその他一切の情報が、
                                    当社又は第三者の著作権又はその他一切の権利を侵害するものではないことを表明し、保証します。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-thirteen">
                        <h4 class="title-page-second fw-bold">
                            第12条（サービス内容の変更・終了等）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    当社は、本サービス（本サービスにおいて提供する情報の内容を含みます）の全部又は一部を利用者へ事前に通知することなく、
                                    変更、中断、又は終了する事があります。それにより利用者や第三者が損害を被った場合でも当社は一切の責任を負いかねます。
                                </li>
                                <li>
                                    当社は、下記のいずれかの事由があるとき、利用者へ事前に通知することなく本サービスの全部あるいは
                                    一部の提供を中断及び停止することがあります。それにより利用者や第三者が損害を被った場合でも、
                                    当社は一切の責任を負いかねます。<br/>
                                    (1)当社又は当社指定の第三者による本サイトに関する設備の保守その他工事を行う場合<br/>
                                    (2)当社又は当社指定の第三者による本サイトに関する設備の障害又は故障の場合<br/>
                                    (3)地震、洪水、津波等の自然災害、戦争、動乱、暴動、停電その他の非常事態が発生した場合<br/>
                                    (4)司法、行政機関等しかるべき機関の要請による場合<br/>
                                    (5)その他運用上、技術上の理由により当社が必要と判断した場合
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-fourteen">
                        <h4 class="title-page-second fw-bold">
                            第13条（利用者へのご連絡手段）
                        </h4>
                        <div class="content">
                            当社からのご連絡、通知は、当社の任意の選択により、当社所定のサイトへの掲載又は登録情報に記載されたメールアドレスその他の
                            連絡先に対して行うことで足りるものとします。
                        </div>
                    </div>

                    <div class="card card-content-fifteen">
                        <h4 class="title-page-second fw-bold">
                            第14条（免責事項）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    当社は、求人情報について十分な注意を払って提供しておりますが、情報の内容の正確性・妥当性・適法性・安全性・目的適合性・有
                                    用性その他一切の事項について保証せず、利用者がこれらの情報に関連し損害を被った場合にも一切の責任を負わないものとします。
                                </li>
                                <li>
                                    求人情報の最終的な内容の確認は、利用者がその責任において当該求人情報の求人者に対して直接行うこととします。
                                </li>
                                <li>
                                    当社は、利用者の行った求人への応募・問い合わせ等に際して利用者が求人者に提供した情報（個人情報を含みます）について、
                                    求人者における当該提供情報の取扱方法の適法性、妥当性その他一切の事項について保証せず、利用者が求人者の当該提供情報の
                                    取扱方法に関連し損害を被った場合に一切の責任を負わないものとします。なお、求人者における利用者の提供した
                                    情報の取扱方法についての確認は、利用者がその責任において当該提供先である求人者に対して直接行うこととします。
                                </li>
                                <li>
                                    当社は、本サービスにおいて表示される掲載企業の財務内容の優良性、事業体としての存続可能性、
                                    当該掲載企業が営む事業及び求人情報記載の業務内容の適法性、社会的妥当性その他一切の事項について、
                                    いかなる保証（明示的、黙示的を問いません）もいたしません。利用者は、ご自身の判断と責任で求人へご応募ください。
                                </li>
                                <li>
                                    当社は、本サービスにおいて求人情報に加えて関連情報として様々な情報を提供しますが、その内容の正確性・妥当性・適法性・
                                    安全性・目的適合性・有用性・信憑性・完全性・最新性・適時性・網羅性その他一切の事項について保証せず、当社および当社への
                                    情報提供元は、利用者がこれらの情報に関連し損害を被った場合にも一切の責任を負わないものとします。
                                </li>
                                <li>
                                    本サービスにおいて提供する情報の全部又は一部は、利用者に対して予告なく、変更、中断、又は停止される場合があります。
                                </li>
                                <li>
                                    本サービス中に掲載される広告（その形態は問いません）や本サービス中にリンクされた外部サイトについて、当社は、
                                    その内容の正確性、速報性、完全性、商品性、又は合目的性等について、いかなる保証（明示的、黙示的を問いません）
                                    もいたしません。また、利用者や第三者に損害や不利益が発生した場合でも、当社は一切の責任を負いかねます。利用者は、
                                    広告内容及びリンクされた外部サイトに関してもご自身の判断と責任でご利用ください。
                                </li>
                                <li>
                                    当社は、本サービスを利用することによって生じた、利用者と求人者その他第三者との間の紛争等について
                                    一切責任を負わないものとします。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-sixteen">
                        <h4 class="title-page-second fw-bold">
                            第15条（情報の利用）
                        </h4>
                        <div class="content">
                            当社は、本サービスを通じて得た情報、利用者より提供あるいは入力された情報を、情報の分析・評価、第三者への
                            情報提供等の為利用することができるものとします。
                        </div>
                    </div>

                    <div class="card card-content-seventeen">
                        <h4 class="title-page-second fw-bold">
                            第16条（他サイトへのリンク）
                        </h4>
                        <div class="content">
                            本サービス中に、他のWebサイトやリソースへのリンクを設置したり、また第三者が他のWebサイトやリソースへのリンクやトラックバック
                            を登録する場合があります。リンク先のWebサイトやリソースはそれぞれの運営者が独立して管理しており、当社ではその内容や安全性など
                            については関知しておらず、一切の責任を負いかねます。
                        </div>
                    </div>

                    <div class="card card-content-eighteen">
                        <h4 class="title-page-second fw-bold">
                            第17条（禁止行為）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    当社は下記の行為を禁止事項と定め、利用者はこれを行わないこととします。<br/>
                                    (1)全部又は一部を問わず、本サービスによって提供される情報を、当社の事前の同意なく、複写、再生、複製、送付、譲渡、頒布、
                                    配布、転売、送信、送信可能化、改変、翻案、翻訳、貸与、又はこれらの目的で利用又は使用するために保管する行為<br/>
                                    (2)本規約又は各サービスの利用規約・ガイドライン等に違反する全ての行為<br/>
                                    (3)公序良俗に反する行為又はそのおそれのある行為<br/>
                                    (4)犯罪的行為、不法行為、又はそのおそれのある行為<br/>
                                    (5)他の利用者又は第三者に不利益を与える行為、又はおそれのある行為<br/>
                                    (6)本サービスの運営を妨げる行為、又はそのおそれのある行為<br/>
                                    (7)当社又は本サービスの信用を毀損する行為、又はそのおそれのある行為<br/>
                                    (8)当社又は第三者の知的所有権（著作権、意匠権、実用新案権、商標権、特許権、ノウハウが含まれるがこれに限定されない）、
                                    名誉、プライバシーその他第三者の権利又は利益を侵害する行為、又はそのおそれのある行為<br/>
                                    (9)上記各号に定める行為を助長する行為<br/>
                                    (10)その他、当社が不適当と判断すること
                                </li>
                                <li>
                                    当社は、前項各号に該当する行為がなされた場合、当該利用者に対して本サービスの利用の停止その他当社が適切と判断する
                                    処置をとらせていただきます。利用者が本規約の内容又は趣旨に違反し、あるいは本規約の精神に照らして不適切な行為を行った
                                    と当社が判断した場合などにも、当該措置をとる場合があります。利用者による不適切な行為その他利用者の帰責性の有無に係わらず、
                                    当社の裁量で当該処置を行うことがあります。当社がかかる措置を行った理由については、その理由の如何を問わず利用者に対して
                                    一切お答えできませんことを予めご承知ください。 当社が行った上記措置に起因して利用者に損害が生じても、
                                    当社は一切の責任を負いかねます。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-nineteen">
                        <h4 class="title-page-second fw-bold">
                            第18条（本規約の変更）
                        </h4>
                        <div class="content">
                            <ol>
                                <li>
                                    当社は、本規約を変更できるものとし、当社が任意に定めた効力発生日から変更後の本規約の効力が発生するものとします。
                                </li>
                                <li>
                                    前項の場合、当社は、効力発生日の１ヶ月以上前の相当な時期までに、利用者に対して、本規約の変更の内容及び効力発生日を通知い
                                    たします。但し、当該変更による利用者の不利益の程度が軽微であると当社が判断した場合、その期間を短縮することができるもの
                                    とします。
                                </li>
                                <li>
                                    前項の規定は、本規約の変更が利用者の一般の利益に適合する場合には適用しないものとします。
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="card card-content-twenty">
                        <h4 class="title-page-second fw-bold">
                            第19条（準拠法、裁判管轄）
                        </h4>
                        <div class="content">
                            本規約は、日本法に基づき解釈されるものとします。本規約に関して訴訟の必要が生じた場合には、
                            訴額に応じて東京簡易裁判所又は東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                        </div>
                    </div>

                    <div class="card card-content-twenty-one">
                        <div class="content">
                            制定日：２０２２年２月１日
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
        name: 'TermUse',
        layout: 'authUnrequired',
        head() {
            return {title: `${ this.$t('general.terms') }`}
        },
    }
</script>

<style lang="scss" scoped>
    @import '../styles/pages/users/term-use.scss';
</style>>

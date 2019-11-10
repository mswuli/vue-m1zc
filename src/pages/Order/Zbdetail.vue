<template>
    <div class="Zbdetail">
        <div class="navbar">
                <span class="iconfont" @click="toPrev">&#xe606;</span>
                <span class="title">质保详情</span>
                <span class="sel" :style="{backgroundImage: 'url(' + curbxgs.ins_img + ')' }" ></span>
        </div>
        <div class="neirong" v-if="otype==12">
           <div class="abaoxian">
            <p class="pbiaotou">非中规车保修责任保险承保因机动车零件自身的瑕疵或生产厂家制造、装配不当而产生的损失（不包含厂家召回的情形及因制造等方面的原因而在某一批次、型号或类别的机动车辆中普遍存在的具有同一性的质量问题或隐藏瑕疵）。具体保修范围如下：</p>
            <h3>综合保修方案（即十二大系统及易损件）</h3>
            <ul class="pneirong">
            <li class="ptitle">（一）被保障部件如下：</li>
            <ul class="pneione">
                <li class="plinei">1、发动机：指为机动车提供动力的裸机 </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou">气缸体：</span>
                        <span class="phoutou">缸体、曲轴、活塞、活塞环、活塞销、曲轴主轴承、轴承、轴瓦、轴瓦盖、连杆、平衡轴、飞轮；</span>
                    </p>
                    <p>
                        <span class="pkaitou">缸盖及配气机构：</span>
                        <span class="phoutou">缸盖、缸盖衬垫、凸轮轴、轴承、气门、气门油封、气门导管、气门挺杆、气门弹簧及弹簧座、气门推杆、摇臂、摇臂轴、摇臂衬套、正时链条、正时链轮（齿轮）、可变气门正时系统；</span>
                    </p>
                    <p>
                        <span class="pkaitou">附件：</span>
                        <span class="phoutou">气门室盖及垫、正时室外罩及垫、正时链条涨紧器、机油冷却器、机油泵、油底壳（含机油油位及品质传感器）、油底壳垫、机油尺导管、机油尺。</span>
                    </p>

                </ul>



                <li class="plinei"> 2、变速器：指变速器本体，不包含任何外置的零部件 </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou">手动变速器(MT)：</span>
                        <span class="phoutou">变速器箱体内的润滑部件，含轴承、齿轮、同步器、轴、拨叉、变速器壳体；
                            不包含变速箱外部挂档机构。</span>
                    </p>
                    <p>
                        <span class="pkaitou">自动变速器(AT)：</span>
                        <span class="phoutou">变速器箱体内的润滑部件，含液力变矩器、各轴承、齿轮、轴、阀体；电磁阀、传感器、变速器内部线束；变速器壳体；</span>
                    </p>
                    <p>
                        <span class="pkaitou">无极自动变速器(CVT)：</span>
                        <span class="phoutou">变速器箱体内的润滑部件，含液压变扭器（或离合器）、液压泵、轴承、齿轮、传速带、传速鼓、轴、阀体；电磁阀、传感器、变速器内部线束；传动机构；变速器壳体；
                            变速器控制单元只有内置变速箱体内，才属于保障范围内的部件，其他情况一律不属于保障部件。</span>
                    </p>

                </ul>
                <li class="plinei">3、传动系统部件：指从变速器输出轴至驱动轴外等速万向节的动力传动零部件。 </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">传动轴、传动轴支撑、轴承、传动轴万向节、主减速器总成、差速器总成、差速器锁、驱动桥壳、驱动轴、等速万向节、分动箱、锁止式轮毂总成(四轮驱动)、齿轮、桥间锁止机构。</span>
                    </p>

                </ul>
                <li class="plinei">4、电器系统部件 </li>
                <ul class="paul">
                    <li class="pdoutou">发动机部分</li>
                    <ul class="pxiaoul">
                        <p>
                            <span class="phoutou">发动机电子控制单元：ECU</span>
                        </p>
                        <p>
                            <span class="phoutou">发动机信号传感器部件：空气流量计、曲轴位置传感器、发动机转速传感器、进气压力传感器、水温传感器、进气温度传感器、凸轮轴位置传感器、霍尔传感器、机油压力传感器。</span>
                        </p>
                        <p>
                            <span class="phoutou">发动机信号执行器部件：点火控制器、怠速控制阀、EGR阀。</span>
                        </p>
                        <p>
                            <span class="phoutou">点火/起动系统部件：起动机、发电机、分电器、点火线圈。</span>
                        </p>
                    </ul>
                    <li class="pdoutou">变速器部分</li>
                    <ul class="pxiaoul">
                        <p>
                            <span class="phoutou">变速器电子控制单元：ECU</span>
                        </p>
                        <p>
                            <span class="phoutou">变速器传感器、控制执行器部件：车速传感器、ATF油温传感器、档位开关。</span>
                        </p>
                        <p>
                            <span class="phoutou">巡航控制系统部件：巡航定速开关、巡航控制传感器、巡航控制电机；</span>
                        </p>

                    </ul>
                    <li class="pdoutou">车身电气部分</li>
                    <ul class="pxiaoul">
                        <p>
                            <span class="phoutou">灯光信号系统部件：示宽灯开关、大灯开关、大灯变光开关、雾灯开关、转向灯开关、警告灯开关、大灯清洗开关、仪表照明调节开关、大灯调节电机；</span>
                        </p>
                        <p>
                            <span class="phoutou">汽车仪表系统部件：组合式仪表总成</span>
                        </p>
                        <p>
                            <span class="phoutou">雨刷清洗系统部件：雨刮开关（含清洗）、自动刮水器控制开关、雨刮电机、雨刮清洗电机、雨量传感器；</span>
                        </p>
                        <p>
                            <span class="phoutou">中控锁系统部件：中控锁开关、各门开关、后备箱开关、油箱盖电动开关、门锁电机；</span>
                        </p>
                        <p>
                            <span class="phoutou">乘客安全保护系统部件：碰撞传感器、安全气囊、气囊卷簧、SRS控制单元、安全带、安全头枕（包含因故障引爆后可能需要更换的仪表板、线束）</span>
                        </p>
                        <p>
                            <span class="phoutou">电动座椅调整系统部件：电动座椅开关、电动座椅记忆开关、电动座椅电机；</span>
                        </p>
                        <p>
                            <span class="phoutou">车身水平控制部件：传感器，高度控制阀，空气泵，动态底盘控制单元。</span>
                        </p>
                        <p>
                            <span class="phoutou">电动后视镜部件：电动后视镜开关、后视镜折叠开关、电动后视镜电机；</span>
                        </p>
                        <p>
                            <span class="phoutou">电动车窗和天窗部件：电动车窗开关、电动天窗开关、电动车窗电机、天窗电机；</span>
                        </p>
                        <p>
                            <span class="phoutou">车门部份：车门钥匙、车门无钥匙进入系统；</span>
                        </p>
                        <p>
                            <span class="phoutou">娱乐系统：车载卫星定位导航设备硬件、车用收音机、CD
                                机、扬声器、音响系统、视频/多媒体播放器装置、汽车天线的相关电动装置（天线本身除外）、所有无线电装置；</span>
                        </p>
                        <p>
                            <span class="phoutou">注：开关故障仅限于可操作开关的功能性故障；保修范围不包括任何因线束的缺陷（控制单元前）或设备的误操作造成的损失</span>
                        </p>

                    </ul>
                </ul>

                <li class="plinei">5、燃油供给系统部件： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">燃油泵、燃油分配器、金属油管、压力调节器、油轨、高压油泵、油箱、燃油位置传感器、</span>
                    </p>
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">不包括：燃油滤清器、喷油嘴。</span>
                    </p>

                </ul>
                <li class="plinei">6、进气、排气系统部件： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">节气门体、进气歧管总成、排气歧管、增压器、中冷器、机械压力控制阀、曲轴箱通风装置、真空泵、二次空气泵。</span>
                    </p>
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">说明：三元催化器与排气歧管一体时，单独三元催化器的损坏不保修。</span>
                    </p>

                </ul>
                <li class="plinei">7、冷却系统部件： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">冷却风扇电机、冷却风扇叶片组、风扇偶合器、水泵、副水泵、散热器、节温器，风扇控制模块。</span>
                    </p>
                </ul>
                <li class="plinei">8、空调系统部件： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">空调压缩机、压缩机离合器、冷凝器、空调高低压压力传感器、室外温度传感器、室内温度传感器、蒸发器、暖风水箱、鼓风机、空调伺服电机、空调开关、空调控制面板、空调控制模块。</span>
                    </p>
                </ul>
                <li class="plinei">9、制动系统部件： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">制动总泵、制动分泵、真空助力器、制动力分配阀、液压制动管路以及固定件、制动踏板及支架；</span>
                    </p>
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">液压控制单元、电子控制单元、车轮转速传感器、液压泵总成、蓄压器、偏摆率传感器、加速度传感器、方向盘转向角度传感器；</span>
                    </p>
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">驻车制动系统：驻车制动器拉线、电子驻车开关、电子驻车泵、电子驻车系统电机、电子驻车控制单元。</span>
                    </p>
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">说明：不包括垫、摩擦片、制动盘、制动鼓。</span>
                    </p>

                </ul>
                <li class="plinei">10、前后悬挂系统部件： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">轴承、转向节、控制臂、导向臂、连杆、平衡杆、悬架、减震器、减震器弹簧（含扭杆弹簧）。</span>
                    </p>
                </ul>
                <li class="plinei">11、转向系统部件： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">转向机、转向泵、皮带轮、动力转向油管、转向摇臂、转向节臂、储液罐、转向管柱、转向连接杆、转向助力油冷却器</span>
                    </p>
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">备注：以上11大系统部件只有在不可能修复和更换内部部件的组件或费用超过整个组件的总成本的情况下，所有主要机械和电器必要的组件才能被全部更换。</span>
                    </p>

                </ul>
                <li class="plinei">12、车身： </li>
                <ul class="paul">
                    <p>
                        <span class="pkaitou"></span>
                        <span class="phoutou">车身骨架、副车架、纵梁、横梁、前后车门本体。</span>
                    </p>
                </ul>
                <li class="plinei">13、易损耗零部件保修的种类范围: </li>
                <ul class="paul">
                    <table class="ptab">
                        <thead>
                            <tr>
                                <th class="td1">序号</th>
                                <th class="td2">种类范围</th>
                                <th class="td3">质量保证期/里程（以先到者为准）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="td1">1</td>
                                <td class="td2">空气滤清器</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">2</td>
                                <td class="td2">空气滤清器</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">3</td>
                                <td class="td2">机油滤清器</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">4</td>
                                <td class="td2">燃油滤清器</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">5</td>
                                <td class="td2">火花塞</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">6</td>
                                <td class="td2">制动摩擦片</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">7</td>
                                <td class="td2">制动盘、制动鼓</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">8</td>
                                <td class="td2">离合器片</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">9</td>
                                <td class="td2">轮胎</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">10</td>
                                <td class="td2">皮管、胶管、软管</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">11</td>
                                <td class="td2">全部皮带（含正时皮带）</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">12</td>
                                <td class="td2">蓄电池</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">13</td>
                                <td class="td2">遥控器电池</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">14</td>
                                <td class="td2">灯泡</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>

                            <tr>
                                <td class="td1">15</td>
                                <td class="td2">雨刮片</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>
                            <tr>
                                <td class="td1">16</td>
                                <td class="td2">保险丝及普通继电器（不含集成控制单元）</td>
                                <td class="td3">自购车发票开具之日起1个月/2000公里</td>
                            </tr>

                        </tbody>
                    </table>
                </ul>





            </ul>
            <li class="ptitle">（二）不被保障的零部件：</li>
            <p class="pershuo">
                <span class="phoutou">凡没有在“被保障零部件”中列明的零部件，或虽然被列明但并非是由车辆制造商或其授权特约维修商提供并安装在车辆上的零部件，均不属于保障方案的被保障零部件。部分（而并非全部的）典型的不被保障的零部件举例如下：</span>
            </p>
            <ul class="pulxia">
                <p class="pxifen">
                    <span class="phoutou">1.车辆出厂按照销售合同配置以外的任何新增加设备；</span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">2.车辆上的油类、润滑脂、工作液等均不在保障范围内，除非它们是在维修或更换被保障零部件的过程中必须使用的；</span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">3.车身装饰物、车底下护板、前后风挡玻璃、车窗玻璃、天窗玻璃、密封梁和活动式车顶（包括织物和框架）及控制装置、主梁、车内装潢、座椅、座椅电加热设备、座椅支架、点烟器、、后视镜镜片、雨刮片、喇叭、钢圈、油漆；</span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">4.轮毂轴承、离合器片、离合器踏板总成、换档杆总成、排气管总成（不包括排气歧管）、三元催化装置、球头；</span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">5．零部件的密封圈（垫）密封功能减弱，仅有轻微的渗出痕迹，这种情况不在保障范围内。除非渗漏形成了液滴，影响了行车安全。</span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">6.车载卫星定位导航设备软件、车载电话、车载免提设备硬件和软件；</span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">7.在非车辆制造商的授权特约维修商处维修或保养车辆时，被安装在车辆上的零部件；</span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">8.所有电力驱动或者混合动力系统零部件。</span>
                </p>


            </ul>

            <li class="ptitle">（三）下列情形和事项下均不能获得保修服务：</li>
            <li class="plibiao">
                1、由于以下情形直接或间接导致车辆零部件（即使是被保障的零部件）发生故障：
            </li>
            <ul class="pneione">
                <p class="pxifen">
                    <span class="phoutou">
                        （1）车辆驾驶人员未遵守车主手册中的有关操作规定，不当使用车辆，或者超出操作或使用限制范围，过度使用车辆，包括但不限于：
                    </span>
                </p>
                <ul class="xiaoxie">
                    <li class="pxiaoxie"><span class="phoutou">
                            a.在车辆缺乏必要数量的冷却液或润滑油，或者仪表显示冷却液或润滑油已经过热或不足等情况下，继续驾驶车辆；
                        </span></li>
                    <li class="pxiaoxie"><span class="phoutou">
                            b.使用与车辆制造商规定不符、不合格或者与车主手册中的规定不匹配的燃料、润滑油等油、液；
                        </span></li>
                    <li class="pxiaoxie"><span class="phoutou">
                            c.拖拽重量超过车辆自身重量60%的其它车辆等；
                        </span></li>
                </ul>
                <p class="pxifen">
                    <span class="phoutou">
                        (2)车辆实际驾驶人员在离开车辆时，没有主动或监督门窗、车顶自动关闭系统关闭天窗、车窗、车门、或活动式车顶；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (3)车辆实际使用者在非约定车辆维修商处维修或者保养车辆，因维修或保养不当导致的故障；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (4)由于不被保障的零部件发生故障导致被保障的零部件发生损坏；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (5)使用非原汽车制造商的零部件引发的故障及维修费用；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (6)车辆涉水行驶，发生交通事故，被外界物体撞击，自燃；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (7)火灾、爆炸、空中运行物体坠落、音爆；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (8)战争、敌对行为、军事行为、恐怖主义行为、武装冲突、罢工、民众骚乱、暴动；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (9)盗窃、抢劫、抢夺、诈骗行为；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (10)核爆炸、核反应、核辐射、放射性污染；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (11)地震、海啸、飓风、暴雨、洪水、雷击、火山爆发、地下火、龙卷风、暴风、冰雹等自然灾害；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (12)烟熏、大气、土地、水污染及其他污染；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (13)动物、昆虫侵入或啃咬；
                    </span>
                </p>
            </ul>



            <li class="plibiao">
                2、只要发生以下情况，无论任何原因导致车辆零部件（即使是被保障的零部件）发生故障，都不能获得保修服务：
            </li>
            <ul class="pneione">
                <p class="pxifen">
                    <span class="phoutou">
                        (1)车辆的发动机号码、车辆识别代号等车辆相关信息与保修服务合同中所记载的不符，或者已经被涂改；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (2)要求提供保修服务时，保修服务合同的服务期限尚未开始或者已经终止；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (3)车辆实际使用者没有按照保修服务合同的约定，对于车辆进行定期保养、故障维修或意外损坏修复；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (4)车辆被改装，不符合车辆制造商原厂规格，包括但不限于：改装或加装进排气系统零部件，改装或加装燃油系统零部件、软件变更等；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (5)除非符合车辆制造商原设计目的，车辆被用于竞赛、赛车前导、越野等用途；或者被用于租赁、作为出租车/计程车、教练车、配送或快递车辆等任何以盈利为目的的商业用途；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (6)车辆被用于公共服务(包括但不限于：警车、消防车、救护车、救助车或者军用车等)用途；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (7)车辆被用于非制造商原设计目的；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (8)车辆被政府有关当局没收、征用，或者其它类似事件使您对于车辆失去了控制；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (9)车辆在中国大陆（不包括香港、澳门、台湾）以外的任何地区；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (10)车辆的里程表失效而未被及时（48小时内）恢复，里程表连接被拆除或未连接，或者里程表读数被调整过；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (11)车辆实际使用者在车辆出现故障后，故意破坏其原始状态，造成故障无法被检测、鉴定、或评估；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (12)车辆实际使用者在车辆出现故障后，恶意夸大损失，提供不真实的证明材料，或企图使用欺诈手段谋取利益；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (13)车辆行驶证被吊销或者没有登记，以及车辆未按照法规检验或检验不合格。
                    </span>
                </p>

            </ul>



            <li class="plibiao">
                3、以下费用或损失，或由于以下情况引起的费用或损失，不属于保修服务内容，本公司不予承担：
            </li>
            <ul class="pneione">
                <p class="pxifen">
                    <span class="phoutou">
                        (1)按照保修服务合同的约定，对于车辆进行定期保养所引起的费用；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (2)维修或更换非保障零部件所引起的费用；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (3)与被保障零部件无关的任何维护、保养、检测、调试、调整、或校正，包括但不限于：轮胎动平衡、车门窗密闭性校正等；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (4)被保障零部件仅需清洗即可恢复正常工作时的拆装和清洗等费用；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (5)单独车轮定位（在我们针对被保障零部件为您提供保修服务的过程中必须进行的除外）；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (6)生锈、侵蚀、霉变；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (7)车辆没有发生故障，单纯以提高车辆的工作性能或舒适性为目的的维修所引起的费用。这种维修包括但不限于：
                    </span>
                </p>

                <ul class="xiaoxie">
                    <li class="pxiaoxie">
                        <span class="phoutou">
                            a.单纯为了提高发动机的压缩比或减少油耗，而对发动机缸体或活塞环进行的修理或更换；
                        </span>
                    </li>
                    <li class="pxiaoxie">
                        <span class="phoutou">
                            b.单纯为了降低车内噪音，而在车辆上添加隔音材料等；
                        </span>
                    </li>
                </ul>
                <p class="pxifen">
                    <span class="phoutou">
                        (8)保修服务合同签署时，车辆已经存在的故障所引起的维修费用；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (9)在车辆已经发生故障的情况下，继续行驶，导致故障或损失扩大的部分；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (10)在车辆已经发生故障的情况下，不及时（24小时内）向我们报告，导致故障或损失扩大的部分；
                    </span>
                </p>

                <p class="pxifen">
                    <span class="phoutou">
                        (11)车辆被召回维修所引起的费用；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (12)经国家质量技术监督检验机构或第三方专业技术机构鉴定，车辆存在由于涉及制造等方面的原因而在某一批次、型号或类别的机动车辆中普遍存在的具有同一性的质量问题或隐藏瑕疵；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (13)在维修车辆故障时，车辆内遗留的任何财/物的损失；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (14)车辆发生故障，或在维修期间不能使用，所引起的任何直接、间接、或衍生性费用或损失，包括但不限于：
                    </span>
                </p>


                <ul class="xiaoxie">
                    <li class="pxiaoxie">
                        <span class="phoutou">
                            a.驾乘人员或第三者的人身伤亡、财产损失、收入损失、商业利益损失、时间损失、不方便、不舒适；
                        </span>
                    </li>
                    <li class="pxiaoxie">
                        <span class="phoutou">
                            b.因延误、滞留、或车辆不能使用引起的通讯费、电话费、食宿费、租车费、燃料费、交通费、差旅费；
                        </span>
                    </li>
                    <li class="pxiaoxie">
                        <span class="phoutou">
                            c.因违反性能、时间、效率、或质量的保证所遭受的罚款等；
                        </span>
                    </li>
                </ul>



                <p class="pxifen">
                    <span class="phoutou">
                        (15)在车辆须经拆解才可以进行故障检测、鉴定、或评估的情况下，若拆解后发现故障不符合提供保修服务的条件时，拆解车辆的费用；
                    </span>
                </p>

                <p class="pxifen">
                    <span class="phoutou">
                        (16)车辆发生故障后，车辆实际使用者在没有经过我们书面同意的情况下，对于车辆进行维修所引起的任何费用或损失；
                    </span>
                </p>
                <p class="pxifen">
                    <span class="phoutou">
                        (17)任何原因导致的车辆价值降低损失。
                    </span>
                </p>

                <p class="pxifen">
                    <span class="phoutou">
                        (18)任何罚金和罚款，或任何与保证性能或功效相关的罚金、违约金和罚款。
                    </span>
                </p>

                <p class="pxifen">
                    <span class="phoutou">
                        (19)在保修服务合同项下的维修，已经由其他服务合同，质量担保，机械故障保险，或维修机构担保涵盖的费用或损失。
                    </span>
                </p>

            </ul>

        </ul>
            </div>
   
        </div>
        
        <div class="neirong"  v-if="otype==13">
            <div class="abaoxian">
                <p class="pbiaotou">非中规车保修责任保险承保因机动车零件自身的瑕疵或生产厂家制造、装配不当而产生的损失（不包含厂家召回的情形及因制造等方面的原因而在某一批次、型号或类别的机动车辆中普遍存在的具有同一性的质量问题或隐藏瑕疵）。具体保修范围如下：</p>
                <h3>重要部件保修方案（即三大部件）</h3>
                <ul class="pneirong">
                    <li class="ptitle">（一）被保障部件如下：</li>
                    <ul class="pneione">
                        <li class="plinei"> 1、发动机：指为机动车提供动力的裸机。</li>
                        <ul class="paul">
                            <p>
                                <span class="pkaitou">气缸体：</span>
                                <span class="phoutou">缸体、曲轴、活塞、活塞环、活塞销、曲轴主轴承、轴承、轴瓦、轴瓦盖、连杆、平衡轴、飞轮；</span>
                            </p>
                            <p>
                                <span class="pkaitou">缸盖及配气机构：</span>
                                <span class="phoutou">缸盖、缸盖衬垫、凸轮轴、轴承、气门、气门油封、气门导管、气门挺杆、气门弹簧及弹簧座、气门推杆、摇臂、摇臂轴、摇臂衬套、正时链条、正时链轮（齿轮）、可变气门正时系统；</span>
                            </p>
                            <p>
                                <span class="pkaitou">附件：</span>
                                <span class="phoutou">气门室盖及垫、正时室外罩及垫、正时链条涨紧器、机油冷却器、机油泵、油底壳（含机油油位及品质传感器）、油底壳垫、机油尺导管、机油尺。</span>
                            </p>

                        </ul>



                        <li class="plinei"> 2、变速器：指变速器本体，不包含任何外置的零部件 </li>
                        <ul class="paul">
                            <p>
                                <span class="pkaitou">手动变速器(MT)部件：</span>
                                <span class="phoutou">变速器箱体内的润滑部件，含轴承、齿轮、同步器、轴、拨叉、变速器壳体；
                                    不包含变速箱外部挂档机构。</span>
                            </p>
                            <p>
                                <span class="pkaitou">自动换挡式手动变速器(AMT)部件：</span>
                                <span class="phoutou">离合器液压驱动总成，变速器箱体内的润滑部件，含液压泵、轴承、齿轮、轴、；电磁阀、传感器、变速器内部线束；变速器壳体；</span>
                            </p>
                            <p>
                                <span class="pkaitou">自动变速器(AT)部件：</span>
                                <span class="phoutou">变速器箱体内的润滑部件，含液力变矩器、各轴承、齿轮、轴、阀体；电磁阀、传感器、变速器内部线束；变速器壳体；</span>
                            </p>
                            <p>
                                <span class="pkaitou">无极自动变速器(CVT)部件：</span>
                                <span class="phoutou">变速器箱体内的润滑部件，含液压变扭器（或离合器）、液压泵、轴承、齿轮、传速带、传速鼓、轴、阀体；电磁阀、传感器、变速器内部线束；传动机构；变速器壳体；
                                    自动变速器控制单元只有内置变速箱体内，才属于保障范围内的部件，其他情况一律不属于保障部件。</span>
                            </p>
                        </ul>
                        <li class="plinei"> 3、传动系统部件：指从变速器输出轴至驱动轴外等速万向节止的动力传动零部件。 </li>
                        <ul class="paul">
                            <p>
                                <span class="pkaitou"></span>
                                <span class="phoutou">传动轴、传动轴支撑、轴承、传动轴万向节、主减速器总成、差速器总成、差速器锁、驱动桥壳、驱动轴、等速万向节、分动箱、锁止式轮毂总成(四轮驱动)、齿轮、桥间锁止机构。</span>
                            </p>

                        </ul>


                    </ul>

                    <li class="ptitle">（二）不被保障的部件：</li>
                    <p class="pershuo">
                        <span class="phoutou">凡没有在“被保修部件”中列明的零部件，或虽然被列明但并非是由车辆制造商或其授权特约维修商提供并安装在车辆上的零部件，均不属于保修方案的被保修零部件，包括但不限于：</span>
                    </p>
                    <ul class="pulxia">
                        <p class="pxifen">
                            <span class="phoutou">1.车辆出厂按照销售合同配置以外的任何新增加设备；</span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">2.根据保养（保修）手册，每隔一定时间或行驶里程必须或应该更换的零部件，例如：摩擦片、发动机正时皮带等常用易损件；</span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">3.三大系统中单独更换油类、润滑脂、工作液等均不在保修范围内；</span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">4.轮毂轴承、离合器片、离合器压盘、分离轴承、离合器踏板总成、换档杆总成、挂档机构、拨叉、倒档轴和倒档齿轮、球头；</span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">5.在非车辆制造商的授权特约维修商处维修或保养车辆时，被安装在车辆上的零部件；</span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">6.不更换重要零部件的单独密封件损坏不保修；</span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">7.所有电力驱动或者混合动力系统零部件。</span>
                        </p>

                    </ul>

                    <li class="ptitle">（三）下列情形和事项下均不能获得保修服务：</li>
                    <li class="plinei">1、由于以下情形直接或间接导致车辆零部件（即使是被保障的零部件）发生故障：</li>
                    <ul class="pneione">
                        <p class="pxifen">
                            <span class="phoutou">
                                （1）车辆驾驶人员未遵守车主手册中的有关操作规定，不当使用车辆，或者超出操作或使用限制范围，过度使用车辆，包括但不限于：
                            </span>
                        </p>
                        <ul class="xiaoxie">
                            <li class="pxiaoxie">
                                <span class="phoutou">a.在车辆缺乏必要数量的冷却液或润滑油，或者仪表显示冷却液或润滑油已经过热或不足等情况下，继续驾驶车辆；</span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">b.使用与车辆制造商规定不符、不合格或者与车主手册中的规定不匹配的燃料、润滑油等油、液；</span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">c.拖拽重量超过车辆自身重量60%的其它车辆等；</span>
                            </li>
                        </ul>
                        <p class="pxifen">
                            <span class="phoutou">
                                (2)车辆实际驾驶人员在离开车辆时，没有主动或监督门窗、车顶自动关闭系统关闭天窗、车窗、车门、或活动式车顶；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (3)车辆实际使用者在非约定车辆维修商处维修或者保养车辆，因维修或保养不当导致的故障；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (4)由于不被保障的零部件发生故障导致被保障的零部件发生损坏；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (5)使用非原汽车制造商的零部件引发的故障及维修费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (6)车辆涉水行驶，发生交通事故，被外界物体撞击，自燃；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (7)火灾、爆炸、空中运行物体坠落、音爆；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (8)战争、敌对行为、军事行为、恐怖主义行为、武装冲突、罢工、民众骚乱、暴动；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (9)盗窃、抢劫、抢夺、诈骗行为；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (10)核爆炸、核反应、核辐射、放射性污染；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (11)地震、海啸、飓风、暴雨、洪水、雷击、火山爆发、地下火、龙卷风、暴风、冰雹等自然灾害；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (12)烟熏、大气、土地、水污染及其他污染；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (13)动物、昆虫侵入或啃咬；
                            </span>
                        </p>
                    </ul>

                    <li class="plinei">2、只要发生以下情况，无论任何原因导致车辆零部件（即使是被保障的零部件）发生故障，都不能获得保修服务：</li>
                    <ul class="pneione">
                        <p class="pxifen">
                            <span class="phoutou">
                                (1)车辆的发动机号码、车辆识别代号等车辆相关信息与保修服务合同中所记载的不符，或者已经被涂改；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (2)要求提供保修服务时，保修服务合同的服务期限尚未开始或者已经终止；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (3)车辆实际使用者没有按照保修服务合同的约定，对于车辆进行定期保养、故障维修或意外损坏修复；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (4)车辆被改装，不符合车辆制造商原厂规格，包括但不限于：改装或加装进排气系统零部件，改装或加装燃油系统零部件、软件变更等；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (5)除非符合车辆制造商原设计目的，车辆被用于竞赛、赛车前导、越野等用途；或者被用于租赁、作为出租车/计程车、教练车、配送或快递车辆等任何以盈利为目的的商业用途；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (6)车辆被用于公共服务(包括但不限于：警车、消防车、救护车、救助车或者军用车等)用途；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (7)车辆被用于非制造商原设计目的；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (8)车辆被政府有关当局没收、征用，或者其它类似事件使您对于车辆失去了控制；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (9)车辆在中国大陆（不包括香港、澳门、台湾）以外的任何地区；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (10)车辆的里程表失效而未被及时（48小时内）恢复，里程表连接被拆除或未连接，或者里程表读数被调整过；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (11)车辆实际使用者在车辆出现故障后，故意破坏其原始状态，造成故障无法被检测、鉴定、或评估；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (12)车辆实际使用者在车辆出现故障后，恶意夸大损失，提供不真实的证明材料，或企图使用欺诈手段谋取利益；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (13)车辆行驶证被吊销或者没有登记，以及车辆未按照法规检验或检验不合格。
                            </span>
                        </p>

                    </ul>

                    <li class="plinei">3、以下费用或损失，或由于以下情况引起的费用或损失，不属于保修服务内容，本公司不予承担：</li>
                    <ul class="pneione">
                        <p class="pxifen">
                            <span class="phoutou">
                                (1)按照保修服务合同的约定，对于车辆进行定期保养所引起的费用；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (2)维修或更换非保障零部件所引起的费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (3)与被保障零部件无关的任何维护、保养、检测、调试、调整、或校正，包括但不限于：轮胎动平衡、车门窗密闭性校正等；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (4)被保障零部件仅需清洗即可恢复正常工作时的拆装和清洗等费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (5)单独车轮定位（在我们针对被保障零部件为您提供保修服务的过程中必须进行的除外）； </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (6)生锈、侵蚀、霉变；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (7)车辆没有发生故障，单纯以提高车辆的工作性能或舒适性为目的的维修所引起的费用。这种维修包括但不限于：
                            </span>
                        </p>


                        <ul class="xiaoxie">
                            <li class="pxiaoxie">
                                <span class="phoutou">a.单纯为了提高发动机的压缩比或减少油耗，而对发动机缸体或活塞环进行的修理或更换；</span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">b.单纯为了降低车内噪音，而在车辆上添加隔音材料等；</span>
                            </li>

                        </ul>





                        <p class="pxifen">
                            <span class="phoutou">
                                (8)保修服务合同签署时，车辆已经存在的故障所引起的维修费用；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (9)在车辆已经发生故障的情况下，继续行驶，导致故障或损失扩大的部分；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (10)在车辆已经发生故障的情况下，不及时（24小时内）向我们报告，导致故障或损失扩大的部分；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (11)车辆被召回维修所引起的费用；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (12)经国家质量技术监督检验机构或第三方专业技术机构鉴定，车辆存在由于涉及制造等方面的原因而在某一批次、型号或类别的机动车辆中普遍存在的具有同一性的质量问题或隐藏瑕疵；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (13)在维修车辆故障时，车辆内遗留的任何财/物的损失；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (14)车辆发生故障，或在维修期间不能使用，所引起的任何直接、间接、或衍生性费用或损失，包括但不限于：
                            </span>
                        </p>


                        <ul class="xiaoxie">
                            <li class="pxiaoxie">
                                <span class="phoutou">a.驾乘人员或第三者的人身伤亡、财产损失、收入损失、商业利益损失、时间损失、不方便、不舒适；</span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">b.因延误、滞留、或车辆不能使用引起的通讯费、电话费、食宿费、租车费、燃料费、交通费、差旅费；</span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">c.因违反性能、时间、效率、或质量的保证所遭受的罚款等；</span>
                            </li>

                        </ul>

                        <p class="pxifen">
                            <span class="phoutou">
                                (15)在车辆须经拆解才可以进行故障检测、鉴定、或评估的情况下，若拆解后发现故障不符合提供保修服务的条件时，拆解车辆的费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (16)车辆发生故障后，车辆实际使用者在没有经过我们书面同意的情况下，对于车辆进行维修所引起的任何费用或损失；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (17)任何原因导致的车辆价值降低损失。
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (18)任何罚金和罚款，或任何与保证性能或功效相关的罚金、违约金和罚款。
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (19)在保修服务合同项下的维修，已经由其他服务合同，质量担保，机械故障保险，或维修机构担保涵盖的费用或损失。
                            </span>
                        </p>

                    </ul>




                </ul>
            </div>
            
        </div>
        
        <div class="neirong"  v-if="otype==14">
            <div class="abaoxian">
                <p class="pbiaotou">非中规车保修责任保险承保因机动车零件自身的瑕疵或生产厂家制造、装配不当而产生的损失（不包含厂家召回的情形及因制造等方面的原因而在某一批次、型号或类别的机动车辆中普遍存在的具有同一性的质量问题或隐藏瑕疵）。具体保修范围如下：</p>

                <h3>经济保修方案<br>（即发动机、变速箱总成及底盘系统和其他部件）</h3>
                <ul class="pneirong">
                    <li class="ptitle">（一）被保障部件如下：</li>
                    <ul class="pneione">
                        <li class="plinei">1、发动机： </li>
                        <ul class="paul">
                            <p>
                                <span class="pkaitou"></span>
                                <span class="phoutou">摇臂总成，包括液压顶杆，进气和排气气门（不包括气门烧蚀），弹簧和导
                                    杆，气缸盖（不含破裂或除积碳），气缸垫（不含清洗），顶杆，凸轮轴及附件, 正时齿轮和正时链（不含张紧器），机油泵，活塞及活塞环，缸体，连杆，活塞销
                                    和轴承，曲轴和轴承，进气歧管，飞轮和齿轮。仅当按照厂家要求更换正时皮带时，正时皮带属于保修范围（必要证明）。发动机控制单元。</span>
                            </p>
                        </ul>

                        <li class="plinei"> 2、变速器： </li>
                        <ul class="paul">
                            <p>
                                <span class="pkaitou">手动变速箱：</span>
                                <span class="phoutou">内部传动轴，齿轮，同步器，换挡机构，轴承及套管，分动箱。</span>
                            </p>
                            <p>
                                <span class="pkaitou">自动变速箱：</span>
                                <span class="phoutou">内部传动轴，齿轮，离合片，摩擦片，阀体，控制单元，油泵，轴承和 套管，伺服机构，驱动圆盘及分动箱。变矩器内部机械故障。</span>
                            </p>
                            <table class="ptab">
                                <thead>
                                    <tr>
                                        <th class="td1">序号</th>
                                        <th class="td2">种类范围</th>
                                        <th class="td3">质量保证期/里程（以先到者为准）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="td1">1</td>
                                        <td class="td2">减震器</td>
                                        <td class="td3">自购车发票开具之日起1年或10000公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">2</td>
                                        <td class="td2">刹车盘</td>
                                        <td class="td3">自购车发票开具之日起1年或10000公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">3</td>
                                        <td class="td2">刹车总泵</td>
                                        <td class="td3">自购车发票开具之日起3年或60000公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">4</td>
                                        <td class="td2">刹车分泵</td>
                                        <td class="td3">自购车发票开具之日起1年或10000公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">5</td>
                                        <td class="td2">等速万向节</td>
                                        <td class="td3">自购车发票开具之日起1年或10000公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">6</td>
                                        <td class="td2">半轴及球笼</td>
                                        <td class="td3">自购车发票开具之日起1年或10000公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">7</td>
                                        <td class="td2">轮轴轴承</td>
                                        <td class="td3">自购车发票开具之日起1年或10000公里</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="ptab">
                                <thead>
                                    <tr>
                                        <th class="td1">序号</th>
                                        <th class="td2">种类范围</th>
                                        <th class="td3">质量保证期/里程（以先到者为准）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="td1">1</td>
                                        <td class="td2">电瓶</td>
                                        <td class="td3">自购车发票开具之日起1年不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">2</td>
                                        <td class="td2">车身模块</td>
                                        <td class="td3">自购车发票开具之日起1年不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">3</td>
                                        <td class="td2">喇叭</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">4</td>
                                        <td class="td2">大灯</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">5</td>
                                        <td class="td2">附件驱动皮带</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">6</td>
                                        <td class="td2">雨刮电机</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">7</td>
                                        <td class="td2">玻璃升降电机</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">8</td>
                                        <td class="td2">转向系统</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">9</td>
                                        <td class="td2">悬架系统</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>
                                    <tr>
                                        <td class="td1">10</td>
                                        <td class="td2">前/后桥</td>
                                        <td class="td3">自购车发票开具之日起6个月不限公里</td>
                                    </tr>

                                </tbody>
                            </table>

                            <p>
                                <span class="pkaitou">无极变速箱：</span>
                                <span class="phoutou">内部离合器，行星齿轮，减速齿轮，轴，可变钢带，推力轴，内部密封 件，套管及轴承。差速器内部冠状齿轮，轴，轴承及套管，推力垫圈和垫片。</span>
                            </p>
                            <p>
                                <span class="pkaitou">【注】：</span>
                                <span class="phoutou">发动机、变速器两大部件，只有在修复和更换部件的组件费用超过整个组件总成本的情况下，才能更换总成。</span>
                            </p>
                        </ul>
                        <li class="plinei"> 3、底盘系统： </li>
                        <li class="plinei"> 4、其他部件： </li>
                    </ul>
                    <li class="ptitle">（二）不被保障的部件：</li>
                    <ul class="pneione">
                        <p class="pershuo">
                            <span class="phoutou">
                                凡没有在“被保修部件”中列明的零部件，或虽然被列明但并非是由非车辆制造商或其授权特约维修商提供并安装在车辆上的零部件，均不属于保修方案的被保修零部件，包括但不限于：
                            </span>
                        </p>
                        <ul class="pulxia">
                            <p class="pxifen">
                                <span class="phoutou">
                                    1.车辆出厂按照销售合同配置以外的任何新增加设备；
                                </span>
                            </p>
                            <p class="pxifen">
                                <span class="phoutou">
                                    2.根据保养（保修）手册，每隔一定时间或行驶里程必须或应该更换的零部件，例如：摩擦片等常用易损件；
                                </span>
                            </p>
                            <p class="pxifen">
                                <span class="phoutou">
                                    3.两大系统中单独更换油类、润滑脂、工作液等均不在保修范围内；
                                </span>
                            </p>
                            <p class="pxifen">
                                <span class="phoutou">
                                    4.离合器片、离合器压盘、分离轴承、离合器踏板总成、换档杆总成、拨叉、倒档轴和倒档齿轮、球头；
                                </span>
                            </p>
                            <p class="pxifen">
                                <span class="phoutou">
                                    5.在非车辆制造商或其授权的特约维修商处维修或保养车辆时，被安装在车辆上的零部件；
                                </span>
                            </p>
                            <p class="pxifen">
                                <span class="phoutou">
                                    6.不更换重要零部件的单独密封件损坏不保修；
                                </span>
                            </p>
                            <p class="pxifen">
                                <span class="phoutou">
                                    7.所有电力驱动或者混合动力系统零部件。
                                </span>
                            </p>
                        </ul>
                    </ul>
                    <li class="ptitle">（三）下列情形和事项下均不能获得保修服务：</li>
                    <li class="plibiao">
                        1、由于以下情形直接或间接导致车辆零部件（即使是被保障的零部件）发生故障：
                    </li>
                    <ul class="pneione">
                        <p class="pxifen">
                            <span class="phoutou">
                                （1）车辆驾驶人员未遵守车主手册中的有关操作规定，不当使用车辆，或者超出操作或使用限制范围，过度使用车辆，包括但不限于：
                            </span>
                        </p>
                        <ul class="xiaoxie">
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    a.在车辆缺乏必要数量的冷却液或润滑油，或者仪表显示冷却液或润滑油已经过热或不足等情况下，继续驾驶车辆；
                                </span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    b.使用与车辆制造商规定不符、不合格或者与车主手册中的规定不匹配的燃料、润滑油等油、液；
                                </span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    c.拖拽重量超过车辆自身重量60%的其它车辆等；
                                </span>
                            </li>
                        </ul>
                        <p class="pxifen">
                            <span class="phoutou">
                                (2)车辆实际驾驶人员在离开车辆时，没有主动或监督门窗、车顶自动关闭系统关闭天窗、车窗、车门、或活动式车顶；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (3)车辆实际使用者在非约定车辆维修商处维修或者保养车辆，因维修或保养不当导致的故障；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (4)由于不被保障的零部件发生故障导致被保障的零部件发生损坏；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (5)使用非原汽车制造商的零部件引发的故障及维修费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (6)车辆涉水行驶，发生交通事故，被外界物体撞击，自燃；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (7)火灾、爆炸、空中运行物体坠落、音爆；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (8)战争、敌对行为、军事行为、恐怖主义行为、武装冲突、罢工、民众骚乱、暴动；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (9)盗窃、抢劫、抢夺、诈骗行为；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (10)核爆炸、核反应、核辐射、放射性污染；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (11)地震、海啸、飓风、暴雨、洪水、雷击、火山爆发、地下火、龙卷风、暴风、冰雹等自然灾害；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (12)烟熏、大气、土地、水污染及其他污染；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (13)动物、昆虫侵入或啃咬；
                            </span>
                        </p>
                    </ul>
                    <li class="plibiao">
                        2、只要发生以下情况，无论任何原因导致车辆零部件（即使是被保障的零部件）发生故障，本公司均不负赔偿责任：
                    </li>
                    <ul class="pneione">
                        <p class="pxifen">
                            <span class="phoutou">
                                (1)车辆的发动机号码、车辆识别代号等车辆相关信息与保修服务合同中所记载的不符，或者已经被涂改；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (2)要求提供保修服务时，保修服务合同的服务期限尚未开始或者已经终止；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (3)车辆实际使用者没有按照保修服务合同的约定，对于车辆进行定期保养、故障维修或意外损坏修复；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (4)车辆被改装，不符合车辆制造商原厂规格，包括但不限于：改装或加装进排气系统零部件，改装或加装燃油系统零部件、软件变更等；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (5)除非符合车辆制造商原设计目的，车辆被用于竞赛、赛车前导、越野等用途；或者被用于租赁、作为出租车/计程车、教练车、配送或快递车辆等任何以盈利为目的的商业用途；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (6)车辆被用于公共服务(包括但不限于：警车、消防车、救护车、救助车或者军用车等)用途；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (7)车辆被用于非制造商原设计目的；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (8)车辆被政府有关当局没收、征用，或者其它类似事件使您对于车辆失去了控制；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (9)车辆在中国大陆（不包括香港、澳门、台湾）以外的任何地区；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (10)车辆的里程表失效而未被及时（48小时内）恢复，里程表连接被拆除或未连接，或者里程表读数被调整过；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (11)车辆实际使用者在车辆出现故障后，故意破坏其原始状态，造成故障无法被检测、鉴定、或评估；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (12)车辆实际使用者在车辆出现故障后，恶意夸大损失，提供不真实的证明材料，或企图使用欺诈手段谋取利益；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (13)车辆行驶证被吊销或者没有登记，以及车辆未按照法规检验或检验不合格。
                            </span>
                        </p>

                    </ul>

                    <li class="plibiao">
                        3、以下费用或损失，或由于以下情况引起的费用或损失，不属于保修服务内容，本公司不予承担：
                    </li>
                    <ul class="pneione">
                        <p class="pxifen">
                            <span class="phoutou">
                                (1)按照保修服务合同的约定，对于车辆进行定期保养所引起的费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (2)维修或更换非保障零部件所引起的费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (3)与被保障零部件无关的任何维护、保养、检测、调试、调整、或校正，包括但不限于：轮胎动平衡、车门窗密闭性校正等；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (4)被保障零部件仅需清洗即可恢复正常工作时的拆装和清洗等费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (5)单独车轮定位（在我们针对被保障零部件为您提供保修服务的过程中必须进行的除外）；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (6)生锈、侵蚀、霉变；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (7)车辆没有发生故障，单纯以提高车辆的工作性能或舒适性为目的的维修所引起的费用。这种维修包括但不限于：
                            </span>
                        </p>
                        <ul class="xiaoxie">
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    a.单纯为了提高发动机的压缩比或减少油耗，而对发动机缸体或活塞环进行的修理或更换；
                                </span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    b.单纯为了降低车内噪音，而在车辆上添加隔音材料等；
                                </span>
                            </li>

                        </ul>
                        <p class="pxifen">
                            <span class="phoutou">
                                (8)保修服务合同签署时，车辆已经存在的故障所引起的维修费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (9)在车辆已经发生故障的情况下，继续行驶，导致故障或损失扩大的部分；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (10)在车辆已经发生故障的情况下，不及时（24小时内）向我们报告，导致故障或损失扩大的部分；
                            </span>
                        </p>

                        <p class="pxifen">
                            <span class="phoutou">
                                (11)车辆被召回维修所引起的费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (12)经国家质量技术监督检验机构或第三方专业技术机构鉴定，车辆存在由于涉及制造等方面的原因而在某一批次、型号或类别的机动车辆中普遍存在的具有同一性的质量问题或隐藏瑕疵；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (13)在维修车辆故障时，车辆内遗留的任何财/物的损失；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (14)车辆发生故障，或在维修期间不能使用，所引起的任何直接、间接、或衍生性费用或损失，包括但不限于：
                            </span>
                        </p>
                        <ul class="xiaoxie">
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    a.驾乘人员或第三者的人身伤亡、财产损失、收入损失、商业利益损失、时间损失、不方便、不舒适；
                                </span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    b.因延误、滞留、或车辆不能使用引起的通讯费、电话费、食宿费、租车费、燃料费、交通费、差旅费；
                                </span>
                            </li>
                            <li class="pxiaoxie">
                                <span class="phoutou">
                                    c.因违反性能、时间、效率、或质量的保证所遭受的罚款等；
                                </span>
                            </li>
                        </ul>

                        <p class="pxifen">
                            <span class="phoutou">
                                (15)在车辆须经拆解才可以进行故障检测、鉴定、或评估的情况下，若拆解后发现故障不符合提供保修服务的条件时，拆解车辆的费用；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (16)车辆发生故障后，车辆实际使用者在没有经过我们书面同意的情况下，对于车辆进行维修所引起的任何费用或损失；
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (17)任何原因导致的车辆价值降低损失。
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (18)任何罚金和罚款，或任何与保证性能或功效相关的罚金、违约金和罚款。
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (19)在保修服务合同项下的维修，已经由其他服务合同，质量担保，机械故障保险，或维修机构担保涵盖的费用或损失。
                            </span>
                        </p>
                        <p class="pxifen">
                            <span class="phoutou">
                                (20)在减震器只出现渗油未出现漏油的情形。
                            </span>
                        </p>
                    </ul>
                </ul>
            </div>
       
        </div>
        

    </div>
</template>

<script>
     import axios from 'axios'
    import qs from 'qs'
    var oimurl = "https://www.1zhanche.com/static/uploads/ins_company_uploads/";
    
    export default{
    	name: 'Zbdetail',

        data(){
        	return{
                 curbxgs:{
                    // imgurl:oimurl+"20180806/fe39edf5f79b5fe94a90aa1921cd7490.png",
                    ins_img:oimurl+"20180806/4c64f49ce8f9f2051dd572ace5169019.png",
                    insurance_company_id:3,
                    company_name:"",
                    ins_phone:"95512",
                    discount:99,     
                },
                objnei:{
                    
                },
                otype:12
            }
        },
        methods:{
            toPrev(){
                this.$router.push({path:"/OrderIns",query:{
                    goods_id:this.$route.query.goods_id,
                    cart_id:this.$route.query.cart_id
                }});
            },
            chushi(){
                this.otype = this.$route.query.otype||12;
            }
        },
        
        mounted() {
             this.chushi()
        }

   }
        
        
</script>

<style scoped="scoped">
        
    .Zbdetail{
        margin-bottom:1rem;
    }
    .navbar{
    	height: 0.67rem;
    	width: 100%;
    	z-index: 15;
    	background-color: #fcfcfc;
    	display: flex;
        position:fixed;
        top:0px;
        left:0px;
    }
    .navbar span{
    	flex: 1;
    	line-height: 0.67rem;
    	padding: 0 .2rem;
    }
    
    .navbar .iconfont{
    	text-align: left;
    	font-weight: 500;
    }
    
    .navbar .title{
    	font-size: .32rem;
    	font-weight: 500;
    }
    
    .navbar .sel{
    	font-size: .24rem;
    	text-align: right;
    	color: #666;
        background-repeat: no-repeat;
        background-position: right center;
        background-size: 100% auto;
        padding: 0 0 0 0.2rem;
        margin-right:0.2rem;
    }
    div.neirong{

        width:90%;
        position:relative;
        margin:1.0rem auto;
        text-align: left;
        word-break: break-all;
        color:#666;
        font-size: 0.28rem;
        line-height: 1.8em;
       /* text-indent: 2em; */
    }
    p.pbiaotou{
        text-indent: 2em;
    }
    h3{
        text-align: center;
        color:#333;
        font-size: 0.32rem;
        font-weight: bold;
        margin:0.40rem 0;
    }
   
</style>

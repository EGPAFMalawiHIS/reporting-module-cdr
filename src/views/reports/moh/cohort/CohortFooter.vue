<template>
  <table class="my-table">
    <tr class="section-description">
      <td class="numbers">&nbsp;</td>
      <td style="font-weight: bold;" colspan="2">ART Clinic</td>
      <td colspan="3" style="text-align: center; font-weight: bold;">Newly registered in quarter</td>
      <td class="vertical-separator">&nbsp;</td>
      <td colspan="3" style="text-align: center; font-weight: bold;">Cumulative ever registered</td>
    </tr>

    <tr class="section-description">
      <td class="numbers">&nbsp;</td>
      <td style="font-weight: bold;" colspan="2">Patients registration details</td>
      <td style="font-weight: normal; text-align:center;">CDR</td>
      <td style="font-weight: normal; text-align:center;">Clinic own*</td>
      <td style="font-weight: normal; text-align:center;">Checked data</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal; text-align:center;">CDR</td>
      <td style="font-weight: normal; text-align:center;">Clinic own*</td>
      <td style="font-weight: normal; text-align:center;">Checked data</td>
    </tr>

    <tr>
      <td class="numbers">25.</td>
      <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="2">Total registered</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('total_registered');">{{indicators.total_registered ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_total_registered');">{{indicators.cum_total_registered ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">26.</td>
      <td style="font-weight: normal; border-right-style: none !important; border-bottom-style: none !important;
        padding-left: 10px; text-align:left; padding-left:5px;">
        <b>FT</b>&nbsp;&nbsp;Patients initiated
      </td>
      <td style="font-weight: normal; border-left-style: none !important; 
        text-align:left; border-bottom-style: none !important;">Male</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('males_initiated_on_art_first_time');">{{indicators.males_initiated_on_art_first_time ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_males_initiated_on_art_first_time');">{{indicators.cum_males_initiated_on_art_first_time ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">27.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 10px; text-align: left;
         border-top-style: none !important; border-bottom-style: none !important;width:100px;">on ART
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align: left;
         border-top-style: none !important; border-bottom-style: none !important;">Female Non-pregnant</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('initial_non_pregnant_females_all_ages');">{{indicators.initial_non_pregnant_females_all_ages ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_initial_non_pregnant_females_all_ages');">{{indicators.cum_initial_non_pregnant_females_all_ages ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>
  
    <tr>
      <td class="numbers">28.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 10px;
         border-top-style: none !important; border-bottom-style: none !important; text-align:left;">
        first time
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align:left; 
         border-top-style: none !important; border-bottom-style: none !important;">Female pregnant</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('initial_pregnant_females_all_ages');">{{indicators.initial_pregnant_females_all_ages ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_initial_pregnant_females_all_ages');">{{indicators.cum_initial_pregnant_females_all_ages ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">29.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 28px;
         border-top-style: none !important; border-bottom-style: none !important;">
        &nbsp;
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align:left; 
         border-top-style: dotted !important; border-bottom-style: none !important">FT Init., Non-disagg.</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('unknown_gender');">{{indicators.unknown_gender ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_unknown_gender');">{{indicators.cum_unknown_gender ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">30.</td>
      <td style="font-weight: normal; border-right-style: none !important; padding-left: 28px;
         border-top-style: none !important;">
        &nbsp;
      </td>
      <td style="font-weight: normal; border-left-style: none !important; text-align:left; 
         border-top-style: dotted !important;">CHECK: Total FT</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('initiated_on_art_first_time');">{{indicators.initiated_on_art_first_time ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_initiated_on_art_first_time');">{{indicators.cum_initiated_on_art_first_time ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>
  
    <tr>
      <td class="numbers">31.</td>
      <td style="text-align: left;border-bottom-style: none;
        font-weight: normal;padding-left: 10px;" colspan="2"><b>Re</b>&nbsp;&nbsp;Patients re-initiated on ART</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('re_initiated_on_art');">{{indicators.re_initiated_on_art ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_re_initiated_on_art');">{{indicators.cum_re_initiated_on_art ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">32.</td>
      <td style="text-align: left;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>TI</b>&nbsp;&nbsp;Patients transferred in on ART
      </td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('transfer_in');">{{indicators.transfer_in ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_transfer_in');">{{indicators.cum_transfer_in ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">33.</td>
      <td style="text-align: left;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>M</b>&nbsp;&nbsp;Males (all ages)
      </td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('quarterly_all_males');">{{indicators.quarterly_all_males ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_all_males');">{{indicators.cum_all_males ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">34.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>FNP</b>&nbsp;&nbsp;Non-pregnant Females (all ages)
      </td>
    <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('non_pregnant_females');">{{indicators.non_pregnant_females ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_non_pregnant_females');">{{indicators.cum_non_pregnant_females ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">35.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>FP</b>&nbsp;&nbsp;Pregnant Females (all ages)
      </td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('pregnant_females_all_ages');">{{indicators.pregnant_females_all_ages ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_pregnant_females_all_ages');">{{indicators.cum_pregnant_females_all_ages ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">36.</td>
      <td style="text-align: left;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>A</b>&nbsp;&nbsp;Children below 24 m at ART initiation
      </td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('children_below_24_months_at_art_initiation');">{{indicators.children_below_24_months_at_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_children_below_24_months_at_art_initiation');">{{indicators.cum_children_below_24_months_at_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">37.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>B</b>&nbsp;&nbsp;Children 24 m - 14 yrs at ART initiation
      </td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('children_24_months_14_years_at_art_initiation');">{{indicators.children_24_months_14_years_at_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_children_24_months_14_years_at_art_initiation');">{{indicators.cum_children_24_months_14_years_at_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">38.</td>
      <td style="text-align: left;border-top-style: none;font-weight: normal;padding-left: 10px;" colspan="2">
        <b>C</b>&nbsp;&nbsp;Adults 15 years+ at ART initiation
      </td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('adults_at_art_initiation');">{{indicators.adults_at_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_adults_at_art_initiation');">{{indicators.cum_adults_at_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">Reason for starting ART</td>
    </tr>

    <tr>
      <td class="numbers">39.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; text-align: left;
        border-bottom-width:0px;"><b>PSHD</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;
        border-bottom-width:0px;">&nbsp;&nbsp;Pres. Sev. HIV disease age {{'&lt;12'}} m</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('presumed_severe_hiv_disease_in_infants');">{{indicators.presumed_severe_hiv_disease_in_infants ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_presumed_severe_hiv_disease_in_infants');">{{indicators.cum_presumed_severe_hiv_disease_in_infants ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">40.</td>

      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-width: 0px !important; border-bottom-style:none;
        border-left-width:1px; border-top-width:0px;">&nbsp;</td>
      <td style="border-left-width:1px !important; border-right-width:1px !important;
        border-bottom-width:0px !important; border-style: dotted; text-align: left; padding-left:10px;
        border-top-width:0px;"><b>PCR</b> Infants  {{'&lt;12'}} mths PCR</td>


      <td style="border-top-width:0px; border-bottom-width:0px; font-weight: normal;"><a href="#" @click.prevent="drillDown('confirmed_hiv_infection_in_infants_pcr');">{{indicators.confirmed_hiv_infection_in_infants_pcr ||  0 }}</a></td>
      <td style="border-top-width:0px; border-bottom-width:0px; font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_confirmed_hiv_infection_in_infants_pcr');">{{indicators.cum_confirmed_hiv_infection_in_infants_pcr ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">41.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; 
        border-bottom-width:0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-left-width: 1px;
        border-top-width:0px; border-style:dotted; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>U5</b> Children 12-59mths</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('quarterly_children_12_59_months');">{{indicators.quarterly_children_12_59_months ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_children_12_59_months');">{{indicators.cum_children_12_59_months ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">42.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-width:1px !important; border-bottom-width:0px;
        border-top-width:0px; border-style: dotted;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>Preg</b> Pregnant women</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('pregnant_women');">{{indicators.pregnant_women ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_pregnant_women');">{{indicators.cum_pregnant_women ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">43.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; border-style: dotted;
        border-left-width:1px;
        border-top-width:0px; border-bottom-width:0px;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>BF</b> Breastfeeding mothers</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('breastfeeding_mothers');">{{indicators.breastfeeding_mothers ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_breastfeeding_mothers');">{{indicators.cum_breastfeeding_mothers ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">44.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; border-style: dotted;
        border-left-width:1px;
        border-top-width:0px; border-bottom-width:0px;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>CD4</b> CD4 below threshold</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('who_stage_two');">{{indicators.who_stage_two ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_who_stage_two');">{{indicators.cum_who_stage_two ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">45.</td>
      
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; border-style: dotted;
        border-left-width:1px;
        border-top-width:0px; border-bottom-width:0px;">&nbsp;</td>
      <td style="border-left-style: none;
        border-top-width:0px; text-align: left; padding-left:10px;
        border-bottom-width:0px;"><b>Asy</b> Asymptomatic / mild</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('asymptomatic');">{{indicators.asymptomatic ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_asymptomatic');">{{indicators.cum_asymptomatic ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">46.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important;
        border-top-width:0px; text-align: left;
        border-bottom-width:0px;"><b>3</b></td>
      <td style="border-left-style: none;
        border-bottom-width:0px; text-align: left; padding-left:10px;
        border-top-width:0px;">WHO stage 3</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('who_stage_three');">{{indicators.who_stage_three ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_who_stage_three');">{{indicators.cum_who_stage_three ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">47.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important;
        border-top-width:0px; text-align: left;
        border-bottom-width:0px;"><b>4</b></td>
      <td style="border-left-width:0px;
        border-bottom-style:none; text-align: left; padding-left:10px;
        border-top-width:0px;">WHO stage 4</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('who_stage_four');">{{indicators.who_stage_four ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_who_stage_four');">{{indicators.cum_who_stage_four ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">48.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px;
        border-right-style: none !important; text-align: left;
        border-top-style:none;"><b>Unk</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;
        border-top-style:none;">Unknown / reason outside guidelines</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('unknown_other_reason_outside_guidelines');">{{indicators.unknown_other_reason_outside_guidelines ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_unknown_other_reason_outside_guidelines');">{{indicators.cum_unknown_other_reason_outside_guidelines ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">Stage defining conditions at ART initiation</td>
    </tr>

    <tr>
      <td class="numbers">49.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>Nev/>2yrs</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;">Never TB / TB over 2 years ago</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('no_tb');">{{indicators.no_tb ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_no_tb');">{{indicators.cum_no_tb ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">50.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>Last 2yrs</b></td>
      <td style=" text-align: left; padding-left:10px;border-left-style: none;">TB within the last 2 years</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('tb_within_the_last_two_years');">{{indicators.tb_within_the_last_two_years ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_tb_within_the_last_two_years');">{{indicators.cum_tb_within_the_last_two_years ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">51.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>Curr</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;">Current episode of TB</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('current_episode_of_tb');">{{indicators.current_episode_of_tb ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_current_episode_of_tb');">{{indicators.cum_current_episode_of_tb ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td colspan="10" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">52.</td>
      <td style="font-weight: normal;padding-left: 10px;width: 15px; text-align: left; padding-left:10px;
        border-right-style: none !important;"><b>KS</b></td>
      <td style="border-left-style: none; text-align: left; padding-left:10px;">Kaposi’s Sarcoma</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('kaposis_sarcoma');">{{indicators.kaposis_sarcoma ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td class="vertical-separator">&nbsp;</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('cum_kaposis_sarcoma');">{{indicators.cum_kaposis_sarcoma ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="6" style="text-align: left;"><b>Primary outcomes as of the end of the quarter evaluated</b></td>
      <td colspan="3" style="text-align: center;"><b>Out of all patients ever registered</b></td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="6" style="text-align: left;">&nbsp;</td>
      <td style="text-align: center;">CDR</td>
      <td style="text-align: center;">Clinic own**</td>
      <td style="text-align: center;">Checked data</td>
    </tr>

    <tr>
      <td class="numbers">53.</td>
      <td style="text-align: left; padding-left: 10px;" colspan="6">Total alive and on ART</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('total_alive_and_on_art');">{{indicators.total_alive_and_on_art ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9" style="text-align: center;">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">54.</td>
      <td style="font-weight: bold; text-align: right;border-right-style: none;
        border-bottom-style: none;border-left-style: none;" colspan="2">M1</td>
      <td style="text-align: left; padding-left: 10px;
        border-right-style: none;border-bottom-style: none; border-left-style: none;" 
        colspan="4">Died within the 1st month after ART initiation</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('died_within_the_1st_month_of_art_initiation');">{{indicators.died_within_the_1st_month_of_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">55.</td>
      <td style="font-weight: bold; text-align:right; border-right-style: none;
        border-top-style: none;border-left-style: none;
        border-bottom-style: none;" colspan="2">M2</td>
      <td style="text-align: left; padding-left: 10px;border-top-style: none;
        border-right-style: none;border-bottom-style: none; border-left-style: none;" 
        colspan="4">Died within the 2nd month after ART initiation</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('died_within_the_2nd_month_of_art_initiation');">{{indicators.died_within_the_2nd_month_of_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">56.</td>
      <td style="font-weight: bold; text-align: right; border-right-style:none;
        border-bottom-style:none; border-left-style:none; border-top-style: none;" colspan="2">M3</td>
      <td style="text-align: left; padding-left:10px; border-top-style: none;
        border-right-style:none; border-bottom-style:none; border-left-style: none;" 
        colspan="4">Died within the 3rd month after ART initiation</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('died_within_the_3rd_month_of_art_initiation');">{{indicators.died_within_the_3rd_month_of_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">57.</td>
      <td style="font-weight: bold; text-align:right; border-right-style: none;
        border-left-style: none; border-top-style: none;" colspan="2">M4+</td>
      <td style="text-align: left; padding-left: 10px;
        border-right-style:none; border-left-style:none; border-top-style: none;" 
        colspan="4">Died after the end of the 3rd month after ART initiation</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('died_after_the_3rd_month_of_art_initiation');">{{indicators.died_after_the_3rd_month_of_art_initiation ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">58.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-style:none;" colspan="6">Died total</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('died_total');">{{indicators.died_total ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">59.</td>
      <td style="text-align: left; padding-left: 10px;
        border-top-style:none; border-bottom-style:none;" colspan="6">Defaulted (more than 2 months overdue after expected to have run out of ARVs)</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('defaulted');">{{indicators.defaulted ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">60.</td>
      <td style="text-align: left; padding-left: 10px;
        border-top-style:none; border-bottom-style:none;" colspan="6">Stopped taking ARVs (clinician or patient own decision, last known alive)</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('stopped_art');">{{indicators.stopped_art ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">61.</td>
      <td style="text-align: left; padding-left: 10px;border-top-style:none;" colspan="6">Transferred Out</td>
      <td style="font-weight: normal;"><a href="#" @click.prevent="drillDown('transfered_out');">{{indicators.transfered_out ||  0 }}</a></td>
      <td style="font-weight: normal;">&nbsp;</td>
      <td style="font-weight: normal;">&nbsp;</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td>&nbsp;</td>
      <td colspan="6" style="font-style: italic; text-align: center;">Check completeness of ‘Clinic own data’</td>
      <td><img src="/assets/images/sum-arrow.png" class="sum-arrows"/></td>
      <td><img src="/assets/images/sum-arrow.png" class="sum-arrows"/></td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">62.</td>
      <td colspan="2">&nbsp;</td>
      <td colspan="5" style="text-align: center; border-style:dotted;
       border-width:1px 1px 0px 1px; text-align: left; padding-left:10px;">Total adv. outcomes = Died total + Defaulted + Stopped + TO</td>
      <td style="border-style:solid; border-width:1px;"><span class="postfixes">A</span></td>
      <td style="border-style:solid; border-width:1px;"><span class="postfixes">B</span></td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">63.</td>
      <td colspan="2">&nbsp;</td>
      <td colspan="5" style="text-align: center; border-style:dotted;
       border-width:0px 0px 1px 1px; text-align: left; padding-left:10px;">Calculate completeness %&nbsp;&nbsp;
       A / B x 100 (Use difference if greater than 100%)</td>
      <td style="border-style:dotted; border-bottom-width:1px;">&nbsp;</td>
      <td style="border-style:solid; border-width:1px;"><span style="left: 40px;" class="postfixes">%</span></td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="7" style="text-align:left; font-weight: bold; padding-left: 10px;">Secondary outcomes of those alive on ART</td>
      <td><b>P</b>aeds formul.</td>
      <td><b>A</b>dults formul.</td>
    </tr>
    
    <tr>
      <td class="numbers">64.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px;">ART Regimens</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">0</td>
      <td><a href="#" @click.prevent="drillDown('zero_p');">{{indicators.zero_p ||  0 }}</a></td>
      <td><a href="#" @click.prevent="drillDown('zero_a');">{{indicators.zero_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">65.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">2</td>
      <td><a href="#" @click.prevent="drillDown('two_p');">{{indicators.two_p ||  0 }}</a></td>
      <td><a href="#" @click.prevent="drillDown('two_a');">{{indicators.two_a ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">66.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">Count regimen for <u>all patients registered</u></td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">4</td>
      <td>
        <div class="granules">
          <div class="granules-row">
            <div class="granules-cell granules-right-td"><span>PP</span></div>
            <div class="granules-cell"><span>PA</span></div>
          </div>
          <div class="granules-row">
            <div class="granules-cell granules-right-td">
              <a href="#" @click.prevent="drillDown('four_pp');" id="four_pp">{{indicators.four_pp || 0}}</a>
            </div>
            <div class="granules-cell">
              <a href="#" @click.prevent="drillDown('four_pa');" id="four_pa">{{indicators.four_pa || 0}}</a>
            </div>
          </div>
        </div>
      </td>
      <td><a href="#" @click.prevent="drillDown('four_a');">{{indicators.four_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">67.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">at this site, including those who currently</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">5</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td><a href="#" @click.prevent="drillDown('five_a');">{{indicators.five_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">68.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-style:dotted;
       border-bottom-width: 1px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 1px; border-style:dotted;
        border-left-width:0px; border-top-width:0px; text-align:left;" colspan="3">get supplies from another site</td>
      <td style="border-right-width:0px; border-bottom-width: 1px; border-style:dotted;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 1px; border-style: dotted;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">6</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td><a href="#" @click.prevent="drillDown('six_a');">{{indicators.six_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">69.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">7</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td><a href="#" @click.prevent="drillDown('seven_a');">{{indicators.seven_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">70.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">8</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td><a href="#" @click.prevent="drillDown('eight_a');">{{indicators.eight_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">71.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">9</td>
      <td>
        <div class="granules">
          <div class="granules-row">
            <div class="granules-cell granules-right-td"><span>PP</span></div>
            <div class="granules-cell"><span>PA</span></div>
          </div>
          <div class="granules-row">
            <div class="granules-cell granules-right-td">
              <a href="#" @click.prevent="drillDown('nine_pp');" id="nine_pp">{{indicators.nine_pp || 0}}</a>
            </div>
            <div class="granules-cell">
              <a href="#" @click.prevent="drillDown('nine_pa');" id="nine_pa">{{indicators.nine_pa || 0}}</a>
            </div>
          </div>
        </div>
      </td>
      <td><a href="#" @click.prevent="drillDown('nine_a');">{{indicators.nine_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">72.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:0px;">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:0px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">10</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td><a href="#" @click.prevent="drillDown('ten_a');">{{indicators.ten_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">73.</td>
      <td colspan="1" style="text-align:left; padding-left: 10px;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="4">Specify ‘Other’ Regimens and number of patients on each</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">11</td>
      <td>
        <div class="granules">
          <div class="granules-row">
            <div class="granules-cell granules-right-td"><span>PP</span></div>
            <div class="granules-cell"><span>PA</span></div>
          </div>
          <div class="granules-row">
            <div class="granules-cell granules-right-td">
              <a href="#" @click.prevent="drillDown('eleven_pp');" id="eleven_pp">{{indicators.eleven_pp}}</a>
            </div>
            <div class="granules-cell">
              <a href="#" @click.prevent="drillDown('eleven_pa');" id="eleven_pa">{{indicators.eleven_pa}}</a>
            </div>
          </div>
        </div>
      </td>
      <td><a href="#" @click.prevent="drillDown('eleven_a');">{{indicators.eleven_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">74.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">12</td>
      <td>
        <div class="granules">
          <div class="granules-row">
            <div class="granules-cell granules-right-td"><span>PP</span></div>
            <div class="granules-cell"><span>PA</span></div>
          </div>
          <div class="granules-row">
            <div class="granules-cell granules-right-td">
              <a href="#" @click.prevent="drillDown('twelve_pp');" id="twelve_pp">{{indicators.twelve_pp || 0}}</a>
            </div>
            <div class="granules-cell">
              <a href="#" @click.prevent="drillDown('twelve_pa');" id="twelve_pa">{{indicators.twelve_pa || 0}}</a>
            </div>
          </div>
        </div>
      </td>
      <td><a href="#" @click.prevent="drillDown('twelve_a');">{{indicators.twelve_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">75.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">13</td>
      <td style="background-color:#D9D9D9;">&nbsp;</td>
      <td><a href="#" @click.prevent="drillDown('thirteen_a');">{{indicators.thirteen_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">76.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">14</td>
      <td>
        <div class="granules">
          <div class="granules-row">
            <div class="granules-cell granules-right-td"><span>PP</span></div>
            <div class="granules-cell"><span>PA</span></div>
          </div>
          <div class="granules-row">
            <div class="granules-cell granules-right-td">
              <a href="#" @click.prevent="drillDown('fourteen_pp');" id="fourteen_pp">{{indicators.fourteen_pp || 0}}</a>
            </div>
            <div class="granules-cell">
              <a href="#" @click.prevent="drillDown('fourteen_pa');" id="fourteen_pa">{{indicators.fourteen_pa || 0}}</a>
            </div>
          </div>
        </div>
      </td>
      <td><a href="#" @click.prevent="drillDown('fourteen_a');">{{indicators.fourteen_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">77.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">15</td>
      <td>
        <div class="granules">
          <div class="granules-row">
            <div class="granules-cell granules-right-td"><span>PP</span></div>
            <div class="granules-cell"><span>PA</span></div>
          </div>
          <div class="granules-row">
            <div class="granules-cell granules-right-td">
              <a href="#" @click.prevent="drillDown('fifteen_pp');" id="fifteen_pp">{{indicators.fifteen_pp || 0}}</a>
            </div>
            <div class="granules-cell">
              <a href="#" @click.prevent="drillDown('fifteen_pa');" id="fifteen_pa">{{indicators.fifteen_pa || 0}}</a>
            </div>
          </div>
        </div>
      </td>
      <td><a href="#" @click.prevent="drillDown('fifteen_a');">{{indicators.fifteen_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">78.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">16</td>
      <td><a href="#" @click.prevent="drillDown('sixteen_p');">{{indicators.sixteen_p ||  0 }}</a></td>
      <td><a href="#" @click.prevent="drillDown('sixteen_a');">{{indicators.sixteen_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">79.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 0px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 0px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;">Regimen</td>
      <td style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px; text-align:right; padding-right: 5px;
        font-weight:bold;">17</td>
      <td>
        <div class="granules">
          <div class="granules-row">
            <div class="granules-cell granules-right-td"><span>PP</span></div>
            <div class="granules-cell"><span>PA</span></div>
          </div>
          <div class="granules-row">
            <div class="granules-cell granules-right-td">
              <a href="#" @click.prevent="drillDown('seventeen_pp');" id="seventeen_pp">{{indicators.seventeen_pp || 0}}</a>
            </div>
            <div class="granules-cell">
              <a href="#" @click.prevent="drillDown('seventeen_pa');" id="seventeen_pa">{{indicators.seventeen_pa || 0}}</a>
            </div>
          </div>
        </div>
      </td>
      <td><a href="#" @click.prevent="drillDown('seventeen_a');">{{indicators.seventeen_a ||  0 }}</a></td>
    </tr>
    
    <tr>
      <td class="numbers">80.</td>
      <td colspan="2" style="text-align:left; padding-left: 10px; border-top-style:dotted;
       border-bottom-width: 1px; border-right-width: 0px; border-top-width:1px;">&nbsp;</td>
      <td style="border-right-width:1px; border-bottom-width: 1px; border-top-style:dotted;
        text-align:left; border-left-width:0px; border-top-width:1px;" colspan="3">&nbsp;</td>
      <td colspan="2" style="border-right-width:0px; border-bottom-width: 0px;
        border-left-width:0px; border-top-width:0px;
        text-align:left; padding-left:10px;">Other (paed./adult)</td>
      <td>&nbsp;</td>
      <td><a href="#" @click.prevent="drillDown('unknown_regimen');">{{indicators.unknown_regimen ||  0 }}</a></td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr  style="page-break-before: always; ">
      <td class="numbers">81.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;">Pregnant / Breastfeeding</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="4">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">Pregnant</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('total_pregnant_women');">{{indicators.total_pregnant_women ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">82.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">Breastfeeding</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('total_breastfeeding_women');">{{indicators.total_breastfeeding_women ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">83.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">All others (not circled)</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('total_other_patients');">{{indicators.total_other_patients ||  0 }}</a></td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">84.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;" colspan="2">Current TB status<br/>any form of TB</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="3">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB not suspected</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('tb_not_suspected');">{{indicators.tb_not_suspected ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">85.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB suspected</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('tb_suspected');">{{indicators.tb_suspected ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">86.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB conf., <b>not</b> on Rx</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('tb_confirmed_currently_not_yet_on_tb_treatment');">{{indicators.tb_confirmed_currently_not_yet_on_tb_treatment ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">87.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">TB conf., <b>on</b> TB Rx</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('tb_confirmed_on_tb_treatment');">{{indicators.tb_confirmed_on_tb_treatment ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">88.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">Unknown (not circled)</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('unknown_tb_status');">{{indicators.unknown_tb_status ||  0 }}</a></td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">89.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;">Side effects</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="4">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">None</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('total_patients_without_side_effects');">{{indicators.total_patients_without_side_effects ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">90.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4">ADRReportformfilledforeachcase?(seeQ110.)◄</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">Any side effects</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('total_patients_with_side_effects');">{{indicators.total_patients_with_side_effects ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">91.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">Unknown (not circled)</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('unknown_side_effects');">{{indicators.unknown_side_effects ||  0 }}</a></td>
    </tr>

    <tr class="horisonatl-separator">
      <td>&nbsp;</td>
      <td colspan="9" style="text-align: left;">&nbsp;</td>
    </tr>

    <tr>
      <td class="numbers">92.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-right-width:0px;">Adherence</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px;" colspan="4">(as of the last visit before end of quarter)</td>
      <td style="font-weight: normal; border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">0 – 3 doses missed</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('patients_with_0_6_doses_missed_at_their_last_visit');">{{indicators.patients_with_0_6_doses_missed_at_their_last_visit ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">93.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:0px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 0px; border-top-width:0px;" colspan="4"></td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:0px;
        text-align:left; padding-left:10px;" colspan="2">4+ doses missed</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('patients_with_7_plus_doses_missed_at_their_last_visit');">{{indicators.patients_with_7_plus_doses_missed_at_their_last_visit ||  0 }}</a></td>
    </tr>

    <tr>
      <td class="numbers">94.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 0px; border-right-width:0px;">&nbsp;</td>
      <td style="font-weight: normal; border-left-width:0px; border-right-width:0px; 
      border-bottom-width: 1px; border-top-width:0px;" colspan="4">&nbsp;</td>
      <td style="font-weight: normal; border-top-width:0px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;" colspan="2">Unknown (not circled)</td>
      <td colspan="2" style="font-weight: normal;"><a href="#" @click.prevent="drillDown('patients_with_unknown_adhrence');">{{indicators.patients_with_unknown_adhrence ||  0 }}</a></td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9" style="text-align:left; font-weight: bold; padding-left: 10px;">Preventive services / HIV related diseases</td>
    </tr>
    <tr>
      <td class="numbers">95.</td>
      <td style="text-align:left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">TPT</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Number of ART patients newly started on TB preventive therapy this quarter</td>
      <td style="text-align:right; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;"><a href="#" @click.prevent="drillDown('newly_initiated_on_ipt');">{{indicators.newly_initiated_on_ipt ||  0 }}</a></td>
      <td style="font-weight:bold; order-top-width:1px; text-align:right;
        border-left-width:0px; border-bottom-width:1px; padding-right:5px;">6H</td>
      <td style="text-align:right; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;"><a href="#" @click.prevent="drillDown('newly_initiated_on_3hp');">{{indicators.newly_initiated_on_3hp ||  0 }}</a></td>
      <td style="font-weight:bold; order-top-width:1px; text-align: right;
        border-left-width:0px; border-bottom-width:1px; padding-right:5px;">3HP</td>
    </tr>
    <tr>
      <td class="numbers">96.</td>
      <td style="text-align:left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">CPT / IPT</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Approx. % of patients retained in ART who are currently on CPT / IPT</td>
      <td style="text-align:right; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;"><a href="#" @click.prevent="drillDown('total_patients_on_arvs_and_cpt');">{{indicators.total_patients_on_arvs_and_cpt ||  0 }}</a></td>
      <td style="font-weight:bold; order-top-width:1px; text-align:right;
        border-left-width:0px; border-bottom-width:1px; padding-right:5px;">CPT%</td>
      <td style="text-align:right; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px;"><a href="#" @click.prevent="drillDown('total_patients_on_arvs_and_ipt');">{{indicators.total_patients_on_arvs_and_ipt ||  0 }}</a></td>
      <td style="font-weight:bold; order-top-width:1px; text-align: right;
        border-left-width:0px; border-bottom-width:1px; padding-right:5px;">IPT%</td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">97.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">PIFP</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Approx. % of women who received Depo at ART in the last quarter</td>

      <td colspan="4" style="text-align: right; padding-right:10px; order-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;"><span><a href="#" @click.prevent="drillDown('total_patients_on_family_planning');">{{indicators.total_patients_on_family_planning ||  0 }}</a></span>&nbsp;%</td>
    </tr>
    
    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9">&nbsp;</td>
    </tr>
    
    <tr>
      <td class="numbers">98.</td>
      <td style="text-align: left; padding-left: 10px; border-bottom-width:1px;
        border-top-width: 1px; border-right-width:0px; font-weight: bold;">BP screen</td>
      <td colspan="4" style="font-weight: normal; border-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;
        text-align:left; padding-left:10px;">Approx. % of adult ART patients with BP recorded at least once this year</td>

      <td colspan="4" style="text-align: right; padding-right:10px; order-top-width:1px;
        border-left-width:0px; border-bottom-width:1px;"><span><a href="#" @click.prevent="drillDown('total_patients_on_family_planning');">{{indicators.total_patients_with_screened_bp ||  0 }}</a></span>&nbsp;%</td>
    </tr>

    <tr class="horisonatl-separator">
      <td class="numbers">&nbsp;</td>
      <td colspan="9">&nbsp;</td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
defineProps({
  indicators: {
    type: Object as PropType<Record<string, number>>,
    default: () => ({})
  },
});

const emit = defineEmits<{
  (e: 'onClickIndicator', indicatorName: string): void
}>();
 

function drillDown(indicatorsName: string){
  emit('onClickIndicator', indicatorsName)
}
</script>

<style scoped>
a {
  color: #337ab7;
  text-decoration: none;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
tr {
  height: 45px;
}
.vertical-separator {
  border-width: 0px;
}
td {
  border-style: solid;
  border-width: 1px;
  text-align: center;
}

.section-description td {
  border-width: 0px;
}
.horisonatl-separator td {
  border-width: 0px;
}
.numbers {
  width: 2.5%;
  text-align: center;
  border-width: 0px 1px 0px 0px;
  border-style: dotted;
}
.sum-arrows {
  width: 75px;
  height: 55px;
}
.postfixes {
  font-size: x-small;
  font-weight: bold;
  position: relative;
  top: -15px;
  left: -40px;
}
.granules {
  width: 100%;
  height: 32px;
  margin: 10px;
  display: table;
}
.granules-row {
  display: table-row;
}
.granules-cell {
  display: table-cell;
  text-align: center;
  padding: 10px;
}
.granules span{
  font-size: 10px;
}
.granules-right-td {
  border-right-style: dotted !important;
  border-right-width: 1px;
}
.dotted-border {
  border-right-style: dotted !important;
  border-right-width: 1px;
}
ion-col > span {
  font-size: 0.7rem;
}
</style>
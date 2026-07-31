# Chapter 2.3 — Health Econometrics

**Health econometrics is the discipline of extracting a trustworthy cause-and-effect claim from messy real-world health data, so that when someone tells you an intervention worked, you can judge whether the data can bear the weight of that word.**

## Why this matters in health economics

Almost every decision a health leader makes rests on a causal claim: this drug lowers mortality, that clinic reduced admissions, this payment reform cut waiting times. The claim is easy to state and hard to earn. Two groups of patients differ in an outcome, but they also differed before anyone intervened — sicker people seek more care, richer regions adopt new programmes first, motivated clinics volunteer for pilots. The core problem is that we never observe what would have happened to the treated group had it gone untreated. Everything in this chapter is about approximating that missing comparison honestly.

The stakes are public money and lives. A confident but wrong causal claim sends a budget towards an intervention that does nothing, or withdraws one that quietly saved lives; both mistakes are paid for in outcomes, not just currency. When a national payer decides to roll a programme out nationwide on the strength of a regional evaluation, the quality of that evaluation's causal reasoning is the difference between scaling a success and scaling an illusion. Leaders rarely run the analysis themselves, but they commission it, fund it, and act on it — which means the appraisal skill is theirs to own.

This chapter is deliberately not a statistics textbook (see the book's scope boundaries). It will not derive an estimator or recommend software. Its job is to tell you what each method is *for*, when a causal claim deserves your trust, and how to commission and appraise econometric work so you are neither fooled by a sophisticated model nor dismissive of good evidence. Where the analysis feeds a decision-analytic model that extrapolates beyond the data, that machinery belongs to Chapter 2.2 — Modelling; here we stay with the estimate itself and whether it is causal.

## Core concepts

[Health econometrics](https://en.wikipedia.org/wiki/Econometrics) is the application of statistical methods to health and health-care data in order to measure relationships and, above all, to support [causal inference](https://en.wikipedia.org/wiki/Causal_inference) — the attempt to establish that a change in one thing *causes* a change in another, rather than merely moving with it. The discipline exists because correlation in health data is abundant and misleading, and because the clean experiment that would settle the question is often impossible, unethical, or unaffordable.

The central obstacle is [confounding](https://en.wikipedia.org/wiki/Confounding): a third factor that influences both who receives an intervention and what outcome they experience, creating an association that is not causal. Patients on a new anticoagulant may bleed less than those on the old one not because the drug is safer but because cautious prescribers gave it to lower-risk patients. Age, deprivation, disease severity, and clinician judgement are relentless confounders in health data, and the ones you can measure are rarely the ones that matter most.

Closely related is [selection bias](https://en.wikipedia.org/wiki/Selection_bias): the people in your treated and comparison groups were sorted into them by a process — self-selection, clinical triage, geography, administrative eligibility — that is itself related to the outcome. A telehealth service used by the digitally confident will show good results partly because its users were healthier and more organized to begin with. Selection is not a nuisance to be dusted off the data; it is frequently the whole story, and the method's job is to neutralize it.

The gold standard for doing so is the [randomized controlled trial](https://en.wikipedia.org/wiki/Randomized_controlled_trial) (RCT), in which participants are allocated to treatment or control by chance. Randomization works because, on average, it balances both the confounders you thought of and the ones you did not, so any difference in outcome can be attributed to the intervention. The disciplines that protect a trial — analysing patients in the group they were randomized to, known as [intention-to-treat](https://en.wikipedia.org/wiki/Intention-to-treat_analysis) analysis, and pre-registering the outcome — exist to stop the selection problem creeping back in through the side door.

Trials are not always feasible, so much of health econometrics works with observational data and borrows credibility from a [natural experiment](https://en.wikipedia.org/wiki/Natural_experiment) — a situation where something outside the participants' control (a policy rollout, an eligibility rule, a lottery, a sudden price change) mimics random allocation. Four quasi-experimental designs recur:

- [Difference-in-differences](https://en.wikipedia.org/wiki/Difference_in_differences) compares the *change* in outcomes for a group exposed to an intervention against the *change* for an unexposed comparison group over the same period. Its credibility rests on the "parallel trends" assumption: that, absent the intervention, the two groups' outcomes would have moved in step.
- [Instrumental variables](https://en.wikipedia.org/wiki/Instrumental_variables_estimation) estimation uses a variable that affects who gets treated but has no direct effect on the outcome except through treatment — distance to a clinic, a lottery number, a randomly assigned reviewer — to isolate variation in treatment that is free of confounding. A valid instrument is genuinely hard to find and impossible to fully test.
- [Regression discontinuity](https://en.wikipedia.org/wiki/Regression_discontinuity_design) exploits a sharp threshold — a risk score, an age, an income cut-off — that determines eligibility. People just above and just below the line are practically identical except for access to the intervention, so comparing them approximates a local experiment.
- [Panel data](https://en.wikipedia.org/wiki/Panel_data) methods follow the same units (patients, hospitals, regions) over time, allowing the analyst to control for everything stable about a unit that never changes, and so remove a large class of confounders that a single cross-section cannot.

Finally, [missing data](https://en.wikipedia.org/wiki/Missing_data) sits underneath all of these. Patients drop out, records are incomplete, and — crucially — the reason data is missing is often related to the outcome, so discarding incomplete records quietly reintroduces selection bias. How missingness was handled is one of the first questions to ask of any study.

## Best practices

1. **Start from the counterfactual, not the method.** Before anyone chooses an estimator, force the question: what is the comparison, and why should we believe it tells us what would have happened without the intervention? The credibility of every result flows from that comparison, not from the sophistication of the statistics on top of it. If the answer is vague, no technique will rescue it.

2. **Commission the design before the data are collected, not after.** The strongest causal claims come from designs planned in advance — a randomized rollout, a pre-registered analysis, an agreed comparison group — because retrofitting a method to existing data invites the analyst to keep searching until a flattering result appears. When you fund an evaluation, fund the design phase and insist on a written analysis plan before results exist.

3. **Prefer randomization where it is ethical and feasible, including staggered rollout.** If a programme cannot reach everyone at once, allocate the order of access by lottery or randomize which sites go first. This turns an operational constraint into a credible experiment at little extra cost, and it is often more defensible than denying anyone treatment. Many of the most trusted policy evaluations are simply rollouts that were randomized rather than chosen.

4. **Treat every quasi-experimental design as a bundle of assumptions, and make them state theirs.** Difference-in-differences lives or dies on parallel trends; instrumental variables on an instrument that is both relevant and exogenous; regression discontinuity on people not manipulating which side of the threshold they land. A good analyst names the assumption their result depends on and shows evidence for it; a weak one hides it. Ask, explicitly, "what has to be true for this to be causal, and how do you know it is?"

5. **Demand the falsification tests, not just the headline estimate.** Credible causal work tries to break its own claim: plotting pre-intervention trends to check they were parallel, testing for jumps at fake thresholds where none should exist, showing the instrument does not predict outcomes it should not touch. The presence of these checks signals honest work; their absence is a warning regardless of how large or welcome the effect is.

6. **Insist on knowing how missing data and dropout were handled.** Ask what fraction of subjects were lost, whether the missing differ from the observed, and what assumption the analysis made about them. "Complete-case analysis" — silently dropping anyone with a gap — is the commonest way selection bias re-enters a study that looked clean. The direction the missing data would push the result is often knowable even when the data are not.

7. **Match the model to the shape of health data.** Costs are skewed by a few very expensive patients, utilization is a count that cannot go negative, and survival data are censored when follow-up ends. Standard linear methods misfit these and can mislead; specialized models exist for each. You do not need to know the mathematics, but you should know enough to ask "is this method appropriate for cost data?" and expect a real answer.

8. **Separate the effect on those treated from the effect you could scale.** Many quasi-experimental methods estimate a *local* effect — the impact on people near a threshold, or on those an instrument happened to move — which may not equal the effect of rolling the intervention out to everyone. A regression discontinuity around age 65 tells you about 65-year-olds, not 40-year-olds. Before generalizing a number, ask whose effect it actually is.

9. **Distinguish statistical significance from decision relevance.** A precisely estimated tiny effect can be statistically significant and economically trivial; a large effect can be uncertain yet still worth acting on given the stakes. Ask for the effect size, its confidence interval, and what it means at the scale of your budget and population — not merely whether a p-value cleared a threshold. The decision turns on magnitude and uncertainty together.

10. **Judge external validity as carefully as internal validity.** A study can be impeccable about causation in its own setting yet irrelevant to yours if the population, health system, or baseline risk differ. An instrument that worked in a US insurance market or a design validated in a Scandinavian registry may not transfer to a low-income setting with different data and incentives. Ask "would this effect hold in my system?" as a separate question from "is this effect real?"

11. **Triangulate rather than trust a single study.** When several methods with different assumptions — a trial, a difference-in-differences, an instrumental-variables estimate — point the same way, confidence is earned; when they diverge, the disagreement is information about which assumptions are failing. Commission or seek more than one line of evidence for any decision large enough to matter, and treat a lone striking result as a hypothesis, not a conclusion.

12. **Write the appraisal down and keep it with the decision.** Record what causal claim you relied on, which design produced it, what assumption it rested on, and what would change your mind. This protects the organization when results are later challenged, and it forces the discipline of stating uncertainty before, not after, the outcome is known. An evaluation whose reasoning is undocumented is an opinion with a chart.

## Questions to discuss with your team

1. **For the last big decision we justified with evidence, what was the comparison group — and would it really have done the same thing without the intervention?** This question goes straight to the counterfactual, which is where most weak evidence hides. Push past the headline number to the structure: who was compared with whom, how were they sorted into those groups, and what would have happened to the treated group had nothing changed. The honest tensions are that the most convenient comparison — before-and-after in the same group, or volunteers versus non-volunteers — is usually the most confounded, and that the people who chose or were chosen for an intervention almost always differ from those who were not. A good discussion names the specific confounders in play (severity, deprivation, motivation, clinician selection) and asks whether the design neutralized them or merely ignored them. The answer you are looking for is not "the study was peer-reviewed" but a clear account of why the comparison is credible — or an admission that it is not, and that the decision rested on judgement dressed as evidence.

2. **When we commission an evaluation, are we buying a design or just a report?** Most organizations procure evaluation as a deliverable that arrives after the programme is running, which is precisely when the strongest causal designs have already become impossible. The tension is between operational urgency — launch now, measure later — and evidential quality, which depends on decisions made before the first patient is enrolled: a randomized rollout order, an agreed comparison region, a pre-registered outcome and analysis plan. Discuss whether your commissioning process invites analysts in early enough to shape the design, or only late enough to rationalize the result. An honest answer confronts the fact that a cheap retrospective evaluation can be worse than none if it lends false confidence, and it looks at whether contracts and timelines make good design structurally possible or structurally impossible in your organization.

3. **What claim would we refuse to act on, and what evidence would change our minds?** This question tests whether the team treats evidence as a genuine input or as decoration for a decision already taken. Naming, in advance, the standard of proof a claim must meet — and the finding that would make you reverse course — is the strongest guard against confirmation bias and against the selective enthusiasm that greets results we like. The real tension is that stakeholders rarely hold favoured programmes and disfavoured ones to the same evidential bar; a beloved initiative gets the benefit of the doubt, a threatening one gets picked apart. An honest discussion surfaces where those double standards live in your organization, agrees what "good enough to act" means for decisions of different sizes, and accepts that pre-committing to what would change your mind is uncomfortable precisely because it might.

4. **When we borrow a striking result from another system, what are we assuming transfers with it?** A study can be flawless about causation in its own setting and still mislead you, because the population, health system, baseline risk, and incentives that produced its effect may be nothing like yours. The tension is that the most impressive evidence usually comes from somewhere else — a US insurance market, a Scandinavian registry, a well-resourced trial site — and its very rigour tempts you to import the number rather than interrogate its fit. Discuss what would have to be true of your population and system for the effect to reproduce: is the baseline risk comparable, does your workforce have the capacity the intervention assumed, do your patients face the same constraints? An honest answer treats external validity as a separate question from internal validity, resists the reflex to discount a distant study merely because it is distant, and names which features of the original setting are doing the work. The worst outcome is scaling an effect that was real there and absent here, then blaming the intervention rather than the transfer.

5. **How much of our data is missing, and are we sure the gaps are innocent?** Every real health dataset has holes — patients drop out, records are incomplete, follow-up ends — and the dangerous case is when the reason data is missing is itself related to the outcome, so that dropping incomplete records quietly smuggles selection bias back into a study that looked clean. The tension is between the convenience of "complete-case" analysis, which is the default in most tools and the fastest route to a result, and the honesty of asking whether the people who vanished differ systematically from those who stayed. Discuss what fraction of subjects were lost, whether the missing look sicker, poorer, or less engaged than the observed, and what the analysis assumed about them. A good answer can often say which direction the missing data would push the estimate even when the values themselves are unrecoverable, and it treats a high or unexplained dropout rate as a threat to the whole claim rather than a footnote. The failure to name is a team that reports the survivors as if they were the whole population.

6. **Do we ever act on a single study, and what would make us wait for a second line of evidence?** Confidence in a causal claim should come from agreement across methods that fail in different ways — a trial, a difference-in-differences, an instrumental-variables estimate pointing the same direction — not from one striking result however well executed. The tension is that triangulation costs time and money the organization rarely wants to spend, and a lone impressive finding creates pressure to act before a second line can be commissioned. Discuss which decisions are large enough to demand more than one line of evidence, and what you do when methods disagree — because divergence is not noise to be averaged away but information about which assumptions are failing. An honest answer distinguishes a hypothesis worth testing from a conclusion worth acting on, and it resists the momentum that turns a single evaluation into settled fact simply because it arrived first and said what people hoped.

## In practice: a health economics example

The Ministry of Health of Solvenia, a fictional upper-middle-income country in Central Europe with a social-insurance system, wants to know whether a new community heart-failure programme — nurse-led clinics that monitor patients after discharge — reduces costly emergency readmissions. Twelve regions have already adopted it; eight have not. An early internal report compared readmission rates in adopting versus non-adopting regions, found them 18 per cent lower in adopters, and recommended national rollout. The Ministry's health economist is asked to check the claim before hundreds of millions of koruna are committed.

Her first question is the counterfactual. The adopting regions were not chosen at random: they were wealthier, had better-organized primary care, and had lower readmission rates *before* the programme began. The naive comparison therefore confounds the programme's effect with the pre-existing advantage of the regions that could adopt it — a textbook selection problem. A simple adopters-versus-non-adopters difference cannot separate the two, and the 18 per cent figure is uninterpretable as a causal effect.

She proposes a difference-in-differences design instead, using several years of regional readmission data before and after each region's adoption date. This compares the *change* in readmissions in adopting regions against the *change* in non-adopting regions, differencing out any fixed regional advantage. Crucially, she first plots the pre-adoption trends: if adopters were already improving faster than non-adopters before the programme, the parallel-trends assumption fails and the design is invalid. The trends are close but not identical, so she reports the estimate with that caveat visible rather than buried.

Because adoption dates were staggered across regions, she also exploits the panel structure, controlling for everything stable about each region and for nationwide shocks like a bad influenza winter that hit every region at once. The difference-in-differences estimate comes in at a 7 per cent reduction in readmissions — real and worth having, but well under half the headline figure, because most of the original 18 per cent was the regions' pre-existing advantage, not the programme. She then checks missing data: two regions had incomplete coding in the transition year, and she shows the result holds whether those region-years are included or excluded.

She is candid about what the estimate is and is not. It is the average effect in regions with the primary-care capacity to run nurse-led clinics; the eight non-adopting regions are poorer and thinner-staffed, so the effect there could be smaller or could require investment the model does not price. That is a question of external validity, and she flags it explicitly rather than assuming the 7 per cent will transfer. Her recommendation to the Ministry is neither "roll out nationally" nor "abandon it", but "fund it where the primary-care capacity exists, and randomize the rollout order in the remaining regions so that the next evaluation can settle the transfer question that this one cannot." The cost-effectiveness of the 7 per cent reduction is then handed to a decision model (Chapter 2.2 — Modelling) that turns the causal estimate into a cost-per-outcome the payer can act on.

## Four sector lenses

### Startup

A digital-health start-up usually meets health econometrics as an evidence demand from a buyer or regulator: prove your app actually changes outcomes, not just that engaged users do well. The temptation is a before-and-after chart of enthusiastic early adopters, which is almost pure selection bias — those users would have improved anyway. The credible, affordable move is a small randomized pilot or a staggered rollout across sites, designed before launch, that isolates the product's effect from the motivation of the people who chose it. Founders who build a clean comparison into the first deployment carry far more weight with payers than those who retrofit a flattering analysis later.

### Small business

An established small provider — a group practice, a single clinic, a community pharmacy, a small device supplier — has real operational data but neither the volume nor the analytics team to run its own quasi-experimental studies, and no launch moment to randomize around. Its econometric task is mostly appraisal: reading the evidence a manufacturer, commissioner, or professional body puts in front of it and judging whether a claimed effect would hold in a caseload like its own. The steadiest move is to ask the external-validity question hard — was this shown in a population, staffing level, and system resembling mine? — rather than to attempt causal analysis it cannot resource. Where it does generate evidence, a staggered change across its own sites or clinicians, or a simple before-and-after read honestly against a comparable neighbouring practice, is more credible than a flattering internal chart. Unlike a start-up chasing a payer's evidence bar, its incentive is to avoid adopting something that quietly wastes scarce time and money on a caseload that never matched the study.

### Enterprise

A large provider or insurer sits on rich longitudinal data — claims, records, registries — and its advantage is the ability to run panel and quasi-experimental analyses at scale. The risk is mistaking data volume for causal clarity: a million confounded records still cannot tell you whether a care-management programme worked, and a well-resourced analytics team can produce sophisticated models that launder selection bias into apparent effect. The mature enterprise separates internal performance reporting from causal evaluation, holds the two to different standards, and builds randomized or staggered designs into its own operational rollouts so that routine change generates trustworthy evidence rather than just dashboards.

### Government

A ministry or national payer makes the highest-stakes causal decisions — scaling a programme nationwide, funding or withdrawing a benefit — and often has policy levers that create natural experiments: eligibility thresholds, phased rollouts, regional pilots. Its discipline should be to design those rollouts as evaluations from the start, so that the inevitable phasing yields a difference-in-differences or a regression discontinuity rather than an uninterpretable comparison. Government also carries a duty the other sectors do not: to guard against the political asymmetry in which favoured programmes escape scrutiny and threatening findings are contested, by pre-committing to evaluation standards and publishing results whether or not they flatter the policy.

## Common failure modes

- **Confusing correlation with causation.** Reporting that treated patients did better without addressing why they were treated. Fix: start from the counterfactual and name the confounders before interpreting any difference.

- **Selecting on the outcome.** Comparing volunteers with non-volunteers, completers with dropouts, or adopters with non-adopters as if the groups were exchangeable. Fix: use a design (randomization, difference-in-differences, instrumental variables, regression discontinuity) that addresses how people were sorted into groups.

- **Silent complete-case analysis.** Dropping everyone with missing data and reporting the remainder as if it were the whole. Fix: report the extent and pattern of missingness and test whether conclusions survive different assumptions about it.

- **Assuming without testing.** Presenting a difference-in-differences without checking parallel trends, or an instrument without arguing its exogeneity. Fix: require the falsification tests and treat their absence as a defect.

- **Generalizing a local effect.** Applying a threshold-based or instrument-based estimate to a population it never described. Fix: state whose effect the number is and appraise external validity separately from internal validity.

- **Statistical-significance theatre.** Treating a p-value as the decision, ignoring effect size and uncertainty. Fix: demand magnitudes and confidence intervals framed against the actual budget and population.

- **Retrofitting the analysis.** Searching an existing dataset until a pleasing result appears, then presenting it as if pre-planned. Fix: pre-register the design and analysis plan before the data are seen.

## Maturity model

| Dimension | Initiate | Develop | Standardize | Manage | Orchestrate |
|---|---|---|---|---|---|
| Causal reasoning | Correlations reported as effects; "the numbers went up" treated as proof | Confounding acknowledged; some adjustment attempted case by case | Counterfactual stated explicitly and a recognized design chosen for each claim | Assumptions named and falsification-tested; effects understood as local or general | Multiple designs triangulated across the organization; disagreement mined for which assumptions fail |
| Study design & commissioning | Evaluation bought as a retrospective report after rollout | Comparison groups chosen but not pre-planned | Designs planned before data collection with pre-registered analysis plans | Randomized or staggered rollouts commissioned as the default for material change | Every operational rollout designed as an evaluation; the estate is a standing evidence engine |
| Data & missingness | Incomplete records dropped silently; data shape ignored | Missingness noted; some appropriate models for costs and counts | Missing-data handling stated and tested, and models matched to data shape | Sensitivity to missingness and specification reported as standard | Data quality and missingness managed upstream so evaluations start from trustworthy inputs |
| Appraisal capability | Results accepted on authority or peer-review label | Some staff can question a headline estimate | Team routinely asks what must be true for a claim to be causal | Independent appraisal embedded and standards of proof agreed before decisions | Appraisal capability shared with partners and suppliers; the whole system reasons causally |
| Use in decisions | Evidence used selectively to support chosen course | Evidence weighed but double standards uncontrolled | Standard of proof and external validity considered before acting | Pre-committed evidence standards applied; results published regardless of direction | Evidence standards govern the portfolio; decisions and their causal basis are recorded and revisited |

## Checklist

- [ ] State the counterfactual: what is the comparison group, and why would it show what the treated group would have done without the intervention?
- [ ] Identify the likely confounders and selection mechanisms, and name the design that addresses them.
- [ ] Confirm the design was planned before the data were collected, with a written analysis plan.
- [ ] For the chosen method, name the key assumption (parallel trends, instrument exogeneity, no threshold manipulation) and check the evidence for it.
- [ ] Require the falsification tests, not just the headline estimate.
- [ ] Ask how much data were missing, whether the missing differ from the observed, and how missingness was handled.
- [ ] Check the model fits the shape of the data (skewed costs, counts, censored survival).
- [ ] Establish whose effect the estimate is (local or general) before generalizing it.
- [ ] Read the effect size and confidence interval against your budget and population, not just the p-value.
- [ ] Appraise external validity — would this hold in my system? — separately from internal validity.
- [ ] Seek a second line of evidence for any decision large enough to matter.
- [ ] Record the causal claim, the design, its key assumption, and what would change your mind.

## Key sources

- Andrew Jones, "Health Econometrics" — in Culyer & Newhouse (eds.), *Handbook of Health Economics* — the standard survey of methods for health data and their pitfalls.
- Jeffrey Wooldridge, *Econometric Analysis of Cross Section and Panel Data* — the reference text for panel and quasi-experimental methods.
- Joshua Angrist & Jörn-Steffen Pischke, *Mostly Harmless Econometrics* — an accessible treatment of causal inference, natural experiments, and the four quasi-experimental designs.
- CONSORT Statement — reporting standards for randomised controlled trials, useful as an appraisal checklist.
- Economics Network, *Health Economics for Teachers* — econometrics module — https://economicsnetwork.ac.uk/health/teachers
- OECD, *Health at a Glance*, and WHO health-systems publications — sources of the routine health data on which much health econometrics is practised.

## References

1. Econometrics — Wikipedia — https://en.wikipedia.org/wiki/Econometrics
2. Causal inference — Wikipedia — https://en.wikipedia.org/wiki/Causal_inference
3. Confounding — Wikipedia — https://en.wikipedia.org/wiki/Confounding
4. Selection bias — Wikipedia — https://en.wikipedia.org/wiki/Selection_bias
5. Randomized controlled trial — Wikipedia — https://en.wikipedia.org/wiki/Randomized_controlled_trial
6. Intention-to-treat analysis — Wikipedia — https://en.wikipedia.org/wiki/Intention-to-treat_analysis
7. Natural experiment — Wikipedia — https://en.wikipedia.org/wiki/Natural_experiment
8. Difference in differences — Wikipedia — https://en.wikipedia.org/wiki/Difference_in_differences
9. Instrumental variables estimation — Wikipedia — https://en.wikipedia.org/wiki/Instrumental_variables_estimation
10. Regression discontinuity design — Wikipedia — https://en.wikipedia.org/wiki/Regression_discontinuity_design
11. Panel data — Wikipedia — https://en.wikipedia.org/wiki/Panel_data
12. Missing data — Wikipedia — https://en.wikipedia.org/wiki/Missing_data
13. Economics Network — Health Economics for Teachers — https://economicsnetwork.ac.uk/health/teachers
14. Health economics — Wikipedia — https://en.wikipedia.org/wiki/Health_economics

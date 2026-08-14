export const EMPTY_QUALIFICATION_FORM = {
  highest: "",

  tenth_syllabus: "",
  tenth_overall: "",

  twelth_stream: "",
  twelth_overall: "",
  twelth_english: "",

  degree_stream: "",
  degree_overall: "",
  degree_english: "",

  pg_stream: "",
  pg_overall: "",
  pg_english: "",

  ielts_overall: "",
  ielts_l: "",
  ielts_r: "",
  ielts_w: "",
  ielts_s: "",
};


/*
|--------------------------------------------------------------------------
| 10th Syllabus
|--------------------------------------------------------------------------
*/

export const TENTH_SYLLABUS_OPTIONS = [
  {
      value: "state syllabus",
      label: "State syllabus",
  },
  {
      value: "CBSE",
      label: "CBSE",
  },
  {
      value: "ICSE",
      label: "ICSE",
  },
];


/*
|--------------------------------------------------------------------------
| +2 Stream
|--------------------------------------------------------------------------
|
| Only Twelfth / Plus Two stream is a dropdown.
|
*/

export const TWELFTH_STREAM_OPTIONS = [
  {
      value: "science",
      label: "Science",
  },
  {
      value: "commerce",
      label: "Commerce",
  },
  {
      value: "humanities",
      label: "Humanities",
  },
  {
      value: "computer science",
      label: "Computer Science",
  },
];


/*
|--------------------------------------------------------------------------
| Normalize highest qualification
|--------------------------------------------------------------------------
*/

export function normalizeHighest(value) {
  const normalized =
      String(value || "")
          .trim()
          .toLowerCase();

  if (
      [
          "plus two",
          "plus-two",
          "plustwo",
          "12th",
          "higher secondary",
      ].includes(normalized)
  ) {
      return "plus two";
  }

  if (
      [
          "degree",
          "graduate",
          "graduation",
          "bachelor",
          "bachelors",
      ].includes(normalized)
  ) {
      return "degree";
  }

  if (
      [
          "masters",
          "master",
          "pg",
          "postgraduate",
          "post graduate",
      ].includes(normalized)
  ) {
      return "masters";
  }

  return normalized;
}


/*
|--------------------------------------------------------------------------
| Section visibility
|--------------------------------------------------------------------------
*/

export function getQualificationVisibility(
  highest
) {
  const value =
      normalizeHighest(highest);

  return {
      showTenth:
          Boolean(value),

      showTwelfth:
          Boolean(value),

      showDegree:
          value === "degree" ||
          value === "masters",

      showPG:
          value === "masters",

      showIELTS:
          Boolean(value),
  };
}


/*
|--------------------------------------------------------------------------
| Existing database values
|--------------------------------------------------------------------------
|
| Important:
|
| We preserve all stored values.
| Highest will be overridden to "" by the form so no radio is selected
| initially.
|
*/

export function getInitialQualificationForm(
  profile = null
) {
  if (!profile) {
      return {
          ...EMPTY_QUALIFICATION_FORM,
      };
  }

  return {
      highest:
          normalizeHighest(
              profile?.highest
          ),

      tenth_syllabus:
          profile?.tenth_syllabus ??
          "",

      tenth_overall:
          profile?.tenth_overall ??
          "",

      twelth_stream:
          profile?.twelth_stream ??
          "",

      twelth_overall:
          profile?.twelth_overall ??
          "",

      twelth_english:
          profile?.twelth_english ??
          "",

      degree_stream:
          profile?.degree_stream ??
          "",

      degree_overall:
          profile?.degree_overall ??
          "",

      degree_english:
          profile?.degree_english ??
          "",

      pg_stream:
          profile?.pg_stream ??
          "",

      pg_overall:
          profile?.pg_overall ??
          "",

      pg_english:
          profile?.pg_english ??
          "",

      ielts_overall:
          profile?.ielts_overall ??
          "",

      ielts_l:
          profile?.ielts_l ??
          "",

      ielts_r:
          profile?.ielts_r ??
          "",

      ielts_w:
          profile?.ielts_w ??
          "",

      ielts_s:
          profile?.ielts_s ??
          "",
  };
}


/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

export function validateQualification(
  form,
  visibility
) {
  const errors = {};

  function requireField(
      key,
      message =
          "This field is required."
  ) {
      const value =
          form?.[key];

      if (
          value === null ||
          value === undefined ||
          String(value).trim() ===
              ""
      ) {
          errors[key] =
              message;
      }
  }

  requireField(
      "highest",
      "Select highest qualification."
  );

  if (
      visibility.showTenth
  ) {
      requireField(
          "tenth_syllabus"
      );

      requireField(
          "tenth_overall"
      );
  }

  if (
      visibility.showTwelfth
  ) {
      requireField(
          "twelth_stream"
      );

      requireField(
          "twelth_overall"
      );

      requireField(
          "twelth_english"
      );
  }

  if (
      visibility.showDegree
  ) {
      requireField(
          "degree_stream"
      );

      requireField(
          "degree_overall"
      );

      requireField(
          "degree_english"
      );
  }

  if (
      visibility.showPG
  ) {
      requireField(
          "pg_stream"
      );

      requireField(
          "pg_overall"
      );

      requireField(
          "pg_english"
      );
  }

  if (
      visibility.showIELTS
  ) {
      requireField(
          "ielts_overall"
      );

      requireField(
          "ielts_l"
      );

      requireField(
          "ielts_r"
      );

      requireField(
          "ielts_w"
      );

      requireField(
          "ielts_s"
      );
  }

  return errors;
}


/*
|--------------------------------------------------------------------------
| API Payload
|--------------------------------------------------------------------------
|
| We keep stored data in UI while editing.
|
| Only when submitting:
|
| Plus Two:
|   Degree + PG -> ""
|
| Degree:
|   PG -> ""
|
| Masters:
|   Degree + PG retained
|
*/

export function buildQualificationPayload(
  form,
  uid
) {
  const highest =
      normalizeHighest(
          form.highest
      );

  const hasDegree =
      highest === "degree" ||
      highest === "masters";

  const hasPG =
      highest === "masters";

  return {
      uid:
          String(uid || ""),

      highest,

      tenth_syllabus:
          form.tenth_syllabus ??
          "",

      tenth_overall:
          form.tenth_overall ??
          "",

      twelth_stream:
          form.twelth_stream ??
          "",

      twelth_overall:
          form.twelth_overall ??
          "",

      twelth_english:
          form.twelth_english ??
          "",

      degree_stream:
          hasDegree
              ? form.degree_stream ??
                ""
              : "",

      degree_overall:
          hasDegree
              ? form.degree_overall ??
                ""
              : "",

      degree_english:
          hasDegree
              ? form.degree_english ??
                ""
              : "",

      pg_stream:
          hasPG
              ? form.pg_stream ??
                ""
              : "",

      pg_overall:
          hasPG
              ? form.pg_overall ??
                ""
              : "",

      pg_english:
          hasPG
              ? form.pg_english ??
                ""
              : "",

      ielts_overall:
          form.ielts_overall ??
          "",

      ielts_l:
          form.ielts_l ??
          "",

      ielts_r:
          form.ielts_r ??
          "",

      ielts_w:
          form.ielts_w ??
          "",

      ielts_s:
          form.ielts_s ??
          "",
  };
}
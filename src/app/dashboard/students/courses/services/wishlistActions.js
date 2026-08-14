async function getSessionUid() {
  const response =
      await fetch(
          "/api/auth/session",
          {
              method: "GET",
              credentials: "include",
              cache: "no-store",
          }
      );

  const result =
      await response
          .json()
          .catch(() => null);

  if (
      !response.ok ||
      result?.authenticated !== true
  ) {
      throw new Error(
          "Your login session has expired. Please login again."
      );
  }

  const uid =
      result?.user?.uid ??
      result?.user?.id ??
      null;

  if (!uid) {
      throw new Error(
          "Student ID could not be found."
      );
  }

  return String(uid);
}


/*
|--------------------------------------------------------------------------
| GET WISHLIST
|--------------------------------------------------------------------------
*/

export async function getWishlistedCourses() {
    const response =
        await fetch(
            "/api/dashboard/student/my-wishlist/get",
            {
                method: "POST",

                credentials:
                    "include",

                cache:
                    "no-store",
            }
        );

    const result =
        await response
            .json()
            .catch(
                () => null
            );

    console.log(
        "GET WISHLIST FRONTEND RESPONSE:",
        result
    );

    if (
        !response.ok ||
        result?.status !== true
    ) {
        throw new Error(
            result?.msg ||
            result?.message ||
            "Unable to fetch wishlist."
        );
    }

    return Array.isArray(
        result?.data
    )
        ? result.data
        : [];
}


/*
|--------------------------------------------------------------------------
| ADD COURSE TO WISHLIST
|--------------------------------------------------------------------------
*/

export async function addCourseToWishlist(
  courseId
) {
  const uid =
      await getSessionUid();

  if (
      courseId === null ||
      courseId === undefined ||
      String(courseId).trim() === ""
  ) {
      throw new Error(
          "Course ID is required."
      );
  }

  const response =
      await fetch(
          "/api/dashboard/student/my-wishlist/add",
          {
              method: "POST",

              headers: {
                  "Content-Type":
                      "application/json",
              },

              credentials:
                  "include",

              cache:
                  "no-store",

              body:
                  JSON.stringify({
                      uid,

                      id:
                          String(
                              courseId
                          ),

                      type:
                          "course",
                  }),
          }
      );

  const result =
      await response
          .json()
          .catch(() => null);

  console.log(
      "ADD WISHLIST FRONTEND RESPONSE:",
      result
  );

  if (
      !response.ok ||
      result?.status !== true
  ) {
      throw new Error(
          result?.msg ||
              result?.message ||
              "Unable to add course to wishlist."
      );
  }

  return result;
}


/*
|--------------------------------------------------------------------------
| REMOVE COURSE FROM WISHLIST
|--------------------------------------------------------------------------
*/

export async function removeCourseFromWishlist(
  wishlistId
) {
  const uid =
      await getSessionUid();

  if (
      wishlistId === null ||
      wishlistId === undefined ||
      String(wishlistId).trim() === ""
  ) {
      throw new Error(
          "Wishlist item ID is required."
      );
  }

  const response =
      await fetch(
          "/api/dashboard/student/my-wishlist/remove",
          {
              method: "POST",

              headers: {
                  "Content-Type":
                      "application/json",
              },

              credentials:
                  "include",

              cache:
                  "no-store",

              body:
                  JSON.stringify({
                      uid,

                      id:
                          String(
                              wishlistId
                          ),

                      type:
                          "course",
                  }),
          }
      );

  const result =
      await response
          .json()
          .catch(() => null);

  console.log(
      "REMOVE WISHLIST FRONTEND RESPONSE:",
      result
  );

  if (
      !response.ok ||
      result?.status !== true
  ) {
      throw new Error(
          result?.msg ||
              result?.message ||
              "Unable to remove course from wishlist."
      );
  }

  return result;
}